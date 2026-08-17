import mongoose from 'mongoose';
import { sampleItems } from '../frontend/src/data/items.js';

const MONGODB_URI = 'mongodb+srv://24pa1a05k6_db_user:S9ljwbymSsNIqHs5@cluster0.8lqsniy.mongodb.net/test?retryWrites=true&w=majority';

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
  console.log('Connecting to MongoDB Atlas (test database)...');
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  console.log('Connected successfully!');

  // 1. Seed Users
  const sampleUsers = [
    {
      id: 'usr-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      password: 'password123',
      phone: '+91 98765 43210',
      role: 'Seller / Owner',
      location: 'SRKR College Road, Bhimavaram',
      verified: true
    },
    {
      id: 'usr-2',
      name: 'Marcus Vance',
      email: 'marcus.v@example.com',
      password: 'password123',
      phone: '+91 98765 43211',
      role: 'Both',
      location: 'J P Road, Bhimavaram',
      verified: true
    },
    {
      id: 'usr-3',
      name: 'Ona Owner',
      email: 'owner@example.com',
      password: 'password123',
      phone: '+91 98765 43212',
      role: 'Seller / Owner',
      location: 'Mavullamma Temple Road, Bhimavaram',
      verified: true
    },
    {
      id: 'usr-4',
      name: 'Rahul Renter',
      email: 'customer@example.com',
      password: 'password123',
      phone: '+91 98765 43213',
      role: 'Consumer / Buyer',
      location: 'Somaram Road, Bhimavaram',
      verified: true
    }
  ];

  for (const u of sampleUsers) {
    await User.findOneAndUpdate({ email: u.email }, { ...u }, { upsert: true, new: true });
  }
  console.log(`✅ Users seeded in MongoDB Atlas (Collection: users)!`);

  // 2. Seed Items
  for (const item of sampleItems) {
    await Item.findOneAndUpdate({ id: item.id }, { ...item }, { upsert: true, new: true });
  }
  console.log(`✅ Items seeded in MongoDB Atlas (Collection: items) count: ${sampleItems.length}!`);

  // 3. Seed Sample Booking
  const sampleBooking = {
    id: 'bk-1786890001',
    itemId: 'item-1',
    itemTitle: 'Canon EOS R5 Full-Frame Mirrorless Camera Kit',
    itemCategory: 'Cameras',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    dailyRent: 450,
    deposit: 3000,
    totalRent: 1350,
    totalPaid: 4350,
    startDate: '2026-08-20',
    endDate: '2026-08-23',
    totalDays: 3,
    renterName: 'Rahul Renter',
    renterEmail: 'customer@example.com',
    renterPhone: '+91 98765 43213',
    ownerName: 'Sarah Jenkins',
    ownerEmail: 'sarah.j@example.com',
    ownerPhone: '+91 98765 43210',
    stage: 'REQUEST_ACCEPTED',
    status: 'Owner Accepted — Ready for Physical Inspection'
  };

  await Booking.findOneAndUpdate({ id: sampleBooking.id }, { ...sampleBooking }, { upsert: true, new: true });
  console.log('✅ Bookings seeded in MongoDB Atlas (Collection: bookings)!');

  const userCount = await User.countDocuments();
  const itemCount = await Item.countDocuments();
  const bookingCount = await Booking.countDocuments();
  console.log(`🎉 SUMMARY: Users: ${userCount}, Items: ${itemCount}, Bookings: ${bookingCount}`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed Error:', err);
  process.exit(1);
});
