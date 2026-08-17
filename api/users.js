import { connectToDatabase, User } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    // GET /api/users
    if (req.method === 'GET') {
      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: users.length, data: users });
    }

    // POST /api/users (Register or Sync User)
    if (req.method === 'POST') {
      const userData = req.body;
      if (!userData.email) {
        return res.status(400).json({ success: false, message: 'User email is required' });
      }

      if (!userData.id) {
        userData.id = `usr-${Date.now()}`;
      }

      const savedUser = await User.findOneAndUpdate(
        { email: userData.email.toLowerCase() },
        { ...userData, email: userData.email.toLowerCase() },
        { upsert: true, new: true }
      );

      return res.status(201).json({ success: true, data: savedUser });
    }

    // PUT /api/users (Update user role or profile)
    if (req.method === 'PUT') {
      const { email, ...updateFields } = req.body;
      const userEmail = email || req.query.email;

      if (!userEmail) {
        return res.status(400).json({ success: false, message: 'User email is required' });
      }

      const updated = await User.findOneAndUpdate(
        { email: userEmail.toLowerCase() },
        { $set: updateFields },
        { new: true }
      );

      return res.status(200).json({ success: true, data: updated });
    }

    // DELETE /api/users
    if (req.method === 'DELETE') {
      const email = req.query.email || req.body?.email;
      if (!email) {
        return res.status(400).json({ success: false, message: 'User email is required' });
      }

      await User.deleteOne({ email: email.toLowerCase() });
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Users API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
