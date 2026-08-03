import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { sampleItems, categories } from './data/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// In-memory fallback stores
let itemsStore = [...sampleItems];
let usersStore = [];
let bookingsStore = [];

// Mongoose Schemas
let isMongoConnected = false;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  role: { type: String, default: 'Both' },
  avatar: String,
  location: String,
  joined: { type: String, default: 'August 2026' }
});

const itemSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  dailyRent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  distance: { type: Number, default: 1.0 },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 1 },
  availability: { type: String, default: 'Available Now' },
  condition: String,
  features: [String],
  images: [String],
  owner: {
    name: String,
    avatar: String,
    rating: Number,
    responseRate: String,
    verified: Boolean,
    phone: String,
    location: String
  },
  location: {
    address: String,
    lat: Number,
    lng: Number
  }
});

const bookingSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  itemTitle: String,
  userEmail: String,
  startDate: String,
  endDate: String,
  totalPaid: Number,
  deposit: Number,
  status: { type: String, default: 'Confirmed' }
});

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Seed initial sample items if MongoDB collection is empty
const seedDatabaseIfEmpty = async () => {
  try {
    const count = await Item.countDocuments();
    if (count === 0) {
      await Item.insertMany(sampleItems);
      console.log(`🌱 Database seeded with ${sampleItems.length} initial rental items!`);
    }
  } catch (err) {
    console.error('Error seeding initial dataset:', err.message);
  }
};

// Connect to MongoDB if URI is present
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Database successfully!');
      await seedDatabaseIfEmpty();
    })
    .catch((err) => {
      console.error('⚠️ MongoDB connection error (using fallback store):', err.message);
    });
} else {
  console.log('ℹ️ MONGODB_URI not detected in env. Running with in-memory store.');
}

// GET Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'BorrowBridge Hyperlocal Rental API',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory Fallback',
    version: '1.0.0'
  });
});

// GET All Items
app.get('/api/items', async (req, res) => {
  try {
    if (isMongoConnected) {
      const mongoItems = await Item.find();
      if (mongoItems.length > 0) {
        return res.json({ success: true, count: mongoItems.length, data: mongoItems });
      }
    }
    res.json({ success: true, count: itemsStore.length, data: itemsStore });
  } catch (err) {
    res.json({ success: true, count: itemsStore.length, data: itemsStore });
  }
});

// GET Item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const dbItem = await Item.findOne({ $or: [{ _id: req.params.id }, { id: req.params.id }] });
      if (dbItem) return res.json({ success: true, data: dbItem });
    }
    const item = itemsStore.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    const item = itemsStore.find(i => i.id === req.params.id);
    res.json({ success: true, data: item });
  }
});

// POST Create Item Listing
app.post('/api/items', async (req, res) => {
  try {
    const newItem = { id: `item-${Date.now()}`, ...req.body };
    itemsStore.unshift(newItem);

    if (isMongoConnected) {
      const dbItem = new Item(newItem);
      await dbItem.save();
    }

    res.status(201).json({ success: true, message: 'Item listed successfully', data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// POST Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || 'New User',
      email,
      phone,
      role: role || 'Both',
      joined: 'August 2026'
    };

    usersStore.push(newUser);

    if (isMongoConnected) {
      const dbUser = new User(newUser);
      await dbUser.save();
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token: `jwt-token-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST Auth Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email } = req.body;
    let userObj = null;

    if (isMongoConnected) {
      userObj = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    }

    if (!userObj) {
      userObj = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!userObj) {
      userObj = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 98765 43210',
        role: 'Both',
        joined: 'August 2026'
      };
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      token: `jwt-token-${Date.now()}`,
      user: userObj
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST AI Assistant Query
app.post('/api/ai/recommend', (req, res) => {
  const { prompt } = req.body;
  res.json({
    success: true,
    reply: `BorrowBot recommendations for: "${prompt}"`,
    items: itemsStore.slice(0, 3)
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BorrowBridge Express Backend running on http://localhost:${PORT}`);
});
