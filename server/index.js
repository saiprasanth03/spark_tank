import express from 'express';
import cors from 'cors';
import { sampleItems, categories } from '../src/data/items.js';

const app = express();
let PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// In-memory store for user listings & bookings created during session
let itemsStore = [...sampleItems];
let userBookings = [
  {
    id: 'booking-101',
    itemId: 'item-1',
    itemTitle: 'Canon EOS R5 Full-Frame Mirrorless Camera Kit',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    totalRent: 90,
    deposit: 300,
    status: 'Confirmed',
    ownerName: 'Sarah Jenkins'
  }
];

// GET All Items / Filtered Items
app.get('/api/items', (req, res) => {
  const { category, search, maxPrice, radius } = req.query;
  let result = [...itemsStore];

  if (category && category !== 'all') {
    result = result.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(i => 
      i.title.toLowerCase().includes(q) || 
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    );
  }

  if (maxPrice) {
    result = result.filter(i => i.dailyRent <= Number(maxPrice));
  }

  if (radius) {
    result = result.filter(i => i.distance <= Number(radius));
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET Item by ID
app.get('/api/items/:id', (req, res) => {
  const item = itemsStore.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, data: item });
});

// POST Create New Item Listing
app.post('/api/items', (req, res) => {
  const newItem = {
    id: `item-${Date.now()}`,
    title: req.body.title || 'Untitled Rental Item',
    category: req.body.category || 'Electronics',
    description: req.body.description || '',
    features: req.body.features || ['Verified Quality', 'Local Pickup Available'],
    dailyRent: Number(req.body.dailyRent) || 20,
    deposit: Number(req.body.deposit) || 100,
    distance: 0.5,
    rating: 5.0,
    reviewCount: 1,
    availability: 'Available Now',
    condition: req.body.condition || 'Excellent',
    images: req.body.images && req.body.images.length > 0 ? req.body.images : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80'],
    owner: {
      name: req.body.ownerName || 'You (Current User)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      rating: 5.0,
      responseRate: '100%',
      verified: true,
      phone: '+1 (555) 999-0000',
      location: req.body.location || 'San Francisco, CA'
    },
    location: {
      address: req.body.location || 'Downtown Market Street, SF',
      lat: 37.785,
      lng: -122.406
    }
  };

  itemsStore.unshift(newItem);
  res.status(201).json({ success: true, message: 'Item listed successfully', data: newItem });
});

// GET Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// POST Auth Login (Mock JWT)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const token = 'mock-jwt-token-borrowbridge-' + Date.now();
  res.json({
    success: true,
    message: 'Logged in successfully',
    token,
    user: {
      id: 'usr-99',
      name: email.split('@')[0].toUpperCase() || 'Alex Morgan',
      email,
      phone: '+1 (555) 321-9876',
      role: 'Both',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      location: 'San Francisco, CA',
      joined: 'August 2026'
    }
  });
});

// POST Auth Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, role } = req.body;
  const token = 'mock-jwt-token-borrowbridge-' + Date.now();
  res.json({
    success: true,
    message: 'Account registered successfully',
    token,
    user: {
      id: 'usr-' + Date.now(),
      name: name || 'New User',
      email: email || 'user@borrowbridge.com',
      phone: phone || '+1 (555) 000-1111',
      role: role || 'Both',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      location: 'San Francisco, CA',
      joined: 'August 2026'
    }
  });
});

// POST Create Booking
app.post('/api/bookings', (req, res) => {
  const { itemId, startDate, endDate, deliveryOption, totalAmount, deposit } = req.body;
  const item = itemsStore.find(i => i.id === itemId);

  const booking = {
    id: `booking-${Date.now()}`,
    itemId,
    itemTitle: item ? item.title : 'Rental Item',
    itemImage: item ? item.images[0] : '',
    startDate: startDate || new Date().toISOString().split('T')[0],
    endDate: endDate || new Date().toISOString().split('T')[0],
    deliveryOption: deliveryOption || 'Self Pickup',
    totalRent: totalAmount || 50,
    deposit: deposit || 100,
    status: 'Confirmed',
    ownerName: item ? item.owner.name : 'Verified Owner'
  };

  userBookings.unshift(booking);
  res.status(201).json({ success: true, message: 'Booking confirmed!', data: booking });
});

// GET User Bookings
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, data: userBookings });
});

// POST AI Assistant Recommendation
app.post('/api/ai/recommend', (req, res) => {
  const { prompt } = req.body;
  const query = (prompt || '').toLowerCase();

  let replyText = "I found some great options nearby that match your request!";
  let recommendedItems = [];

  if (query.includes('camera') || query.includes('photo') || query.includes('wildlife') || query.includes('lens')) {
    replyText = "For photography & wildlife shoots, I highly recommend our full-frame mirrorless setup with telephoto zoom capabilities:";
    recommendedItems = itemsStore.filter(i => i.category === 'Cameras');
  } else if (query.includes('camp') || query.includes('tent') || query.includes('outdoor')) {
    replyText = "Here are the top-rated outdoor and camping bundles available around you right now:";
    recommendedItems = itemsStore.filter(i => i.category === 'Camping');
  } else if (query.includes('laptop') || query.includes('code') || query.includes('game') || query.includes('macbook')) {
    replyText = "Need high-performance computing? Check out these top laptops available for daily rent:";
    recommendedItems = itemsStore.filter(i => i.category === 'Laptops');
  } else if (query.includes('projector') || query.includes('movie') || query.includes('party') || query.includes('speaker')) {
    replyText = "For movies, presentations, or parties, here are the best audio-visual gear items near you:";
    recommendedItems = itemsStore.filter(i => i.category === 'Projectors' || i.category === 'Electronics');
  } else {
    replyText = "Here are top trending items nearby on BorrowBridge available for rent today:";
    recommendedItems = itemsStore.slice(0, 3);
  }

  res.json({
    success: true,
    reply: replyText,
    items: recommendedItems.slice(0, 3)
  });
});

app.listen(PORT, () => {
  console.log(`BorrowBridge Backend API running on http://localhost:${PORT}`);
});
