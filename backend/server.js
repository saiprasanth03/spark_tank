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

// Mongoose Schemas (Active if MONGODB_URI is provided)
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
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  dailyRent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  condition: String,
  images: [String],
  ownerName: String,
  locationAddress: String
});

const bookingSchema = new mongoose.Schema({
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

// Connect to MongoDB if URI is present
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Database successfully!');
    })
    .catch((err) => {
      console.error('⚠️ MongoDB connection error (using in-memory fallback):', err.message);
    });
} else {
  console.log('ℹ️ MONGODB_URI not detected in env. Running with default store (Add MONGODB_URI to connect your cluster).');
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
  const item = itemsStore.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
});

// POST Create Item Listing
app.post('/api/items', async (req, res) => {
  try {
    const newItem = { id: `item-${Date.now()}`, ...req.body };
    itemsStore.unshift(newItem);

    if (isMongoConnected) {
      const dbItem = new Item({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        dailyRent: req.body.dailyRent,
        deposit: req.body.deposit,
        condition: req.body.condition,
        images: req.body.images,
        ownerName: req.body.ownerName,
        locationAddress: req.body.location
      });
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
  const { email } = req.body;
  let userObj = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (isMongoConnected && !userObj) {
    userObj = await User.findOne({ email });
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
