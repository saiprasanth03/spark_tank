import { connectToDatabase, Booking } from './db.js';

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

    // GET /api/bookings
    if (req.method === 'GET') {
      const { userEmail } = req.query;
      let query = {};
      if (userEmail) {
        query = {
          $or: [
            { renterEmail: userEmail.toLowerCase() },
            { ownerEmail: userEmail.toLowerCase() }
          ]
        };
      }
      const bookings = await Booking.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: bookings.length, data: bookings });
    }

    // POST /api/bookings (Create booking request)
    if (req.method === 'POST') {
      const bookingData = req.body;
      if (!bookingData.id) {
        bookingData.id = `bk-${Date.now()}`;
      }

      const savedBooking = await Booking.findOneAndUpdate(
        { id: bookingData.id },
        { ...bookingData },
        { upsert: true, new: true }
      );

      return res.status(201).json({ success: true, data: savedBooking });
    }

    // PUT /api/bookings (Update booking lifecycle / stage)
    if (req.method === 'PUT') {
      const { id, ...updateFields } = req.body;
      const bookingId = id || req.query.id;

      if (!bookingId) {
        return res.status(400).json({ success: false, message: 'Booking ID is required' });
      }

      const updated = await Booking.findOneAndUpdate(
        { id: bookingId },
        { $set: updateFields },
        { new: true }
      );

      return res.status(200).json({ success: true, data: updated });
    }

    // DELETE /api/bookings
    if (req.method === 'DELETE') {
      const id = req.query.id || req.body?.id;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Booking ID is required' });
      }

      await Booking.deleteOne({ id });
      return res.status(200).json({ success: true, message: 'Booking cancelled/deleted' });
    }

    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Bookings API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
