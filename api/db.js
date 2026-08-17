import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://24pa1a05k6_db_user:S9ljwbymSsNIqHs5@cluster0.8lqsniy.mongodb.net/spark_tank?retryWrites=true&w=majority';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false
    }).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

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

export const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
