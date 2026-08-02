import express from 'express';
import cors from 'cors';
import { sampleItems, categories } from './data/items.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let itemsStore = [...sampleItems];
let userBookings = [];

// GET API Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'BorrowBridge Hyperlocal Rental API',
    version: '1.0.0'
  });
});

// GET All Items
app.get('/api/items', (req, res) => {
  res.json({ success: true, count: itemsStore.length, data: itemsStore });
});

// GET Single Item
app.get('/api/items/:id', (req, res) => {
  const item = itemsStore.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
});

// POST Create Item Listing
app.post('/api/items', (req, res) => {
  const newItem = { id: `item-${Date.now()}`, ...req.body };
  itemsStore.unshift(newItem);
  res.status(201).json({ success: true, data: newItem });
});

// GET Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// POST Auth Login
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: `token-${Date.now()}`,
    user: { email, name: email.split('@')[0] }
  });
});

// POST AI Assistant Query
app.post('/api/ai/recommend', (req, res) => {
  const { prompt } = req.body;
  res.json({
    success: true,
    reply: `Here are recommendations for: "${prompt}"`,
    items: itemsStore.slice(0, 3)
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BorrowBridge Express Backend running on http://localhost:${PORT}`);
});
