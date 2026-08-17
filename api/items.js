import { connectToDatabase, Item } from './db.js';

export default async function handler(req, res) {
  // Enable CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();

    // GET /api/items
    if (req.method === 'GET') {
      const items = await Item.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: items.length, data: items });
    }

    // POST /api/items (Add New Product)
    if (req.method === 'POST') {
      const newItemData = req.body;
      if (!newItemData.id) {
        newItemData.id = `item-${Date.now()}`;
      }

      // Upsert into MongoDB
      const savedItem = await Item.findOneAndUpdate(
        { id: newItemData.id },
        { ...newItemData },
        { upsert: true, new: true }
      );

      return res.status(201).json({ success: true, data: savedItem });
    }

    // PUT /api/items (Update Existing Product)
    if (req.method === 'PUT') {
      const { id, ...updateFields } = req.body;
      const itemId = id || req.query.id;

      if (!itemId) {
        return res.status(400).json({ success: false, message: 'Item ID is required' });
      }

      const updated = await Item.findOneAndUpdate(
        { id: itemId },
        { $set: updateFields },
        { new: true }
      );

      return res.status(200).json({ success: true, data: updated });
    }

    // DELETE /api/items (Delete Product)
    if (req.method === 'DELETE') {
      const itemId = req.query.id || req.body?.id;
      if (!itemId) {
        return res.status(400).json({ success: false, message: 'Item ID is required' });
      }

      await Item.deleteOne({ id: itemId });
      return res.status(200).json({ success: true, message: 'Item deleted successfully' });
    }

    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
