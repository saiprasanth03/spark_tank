import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { sampleItems } from '../frontend/src/data/items.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables.');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String, default: '+91 98765 43210' },
  role: { type: String, default: 'Both' },
  avatar: String,
  location: { type: String, default: 'Bhimavaram, AP' },
  joined: { type: String, default: 'August 2026' },
  verified: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  reviews: [Object],
  createdAt: { type: Date, default: Date.now }
});

const itemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  dailyRent: { type: Number, required: true },
  threeDayRent: Number,
  sevenDayRent: Number,
  deposit: { type: Number, required: true },
  marketValue: Number,
  condition: String,
  distanceKm: { type: Number, default: 0.8 },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 1 },
  availability: { type: String, default: 'Available Now' },
  features: [String],
  images: [String],
  owner: {
    name: String,
    avatar: String,
    rating: Number,
    responseRate: String,
    verified: Boolean,
    phone: String,
    email: String,
    location: String
  },
  location: {
    city: { type: String, default: 'Bhimavaram' },
    address: String,
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  itemId: String,
  itemTitle: String,
  itemCategory: String,
  itemImage: String,
  dailyRent: Number,
  deposit: Number,
  totalRent: Number,
  totalPaid: Number,
  startDate: String,
  endDate: String,
  totalDays: Number,
  renterName: String,
  renterEmail: String,
  renterPhone: String,
  ownerName: String,
  ownerEmail: String,
  ownerPhone: String,
  stage: { type: String, default: 'REQUEST_SUBMITTED' },
  status: { type: String, default: 'Pending Owner Review' },
  pickupInspection: Object,
  escrowPayment: Object,
  returnInspection: Object,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

async function seed() {
  console.log('Connecting to MongoDB Atlas using MONGODB_URI env var...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected successfully!');

  // Seed sample items
  for (const item of sampleItems) {
    await Item.findOneAndUpdate({ id: item.id }, { ...item }, { upsert: true, new: true });
  }

  console.log(`✅ Seeded ${sampleItems.length} items to database!`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed Error:', err);
  process.exit(1);
});
