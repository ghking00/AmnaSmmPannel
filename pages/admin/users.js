// pages/api/admin/users.js

import db from '@/utils/db';
import User from '@/models/User';

export default async function handler(req, res) {
  const adminKey = req.headers.authorization;

  if (adminKey !== 'amnapro0088') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await db.connect();
  const users = await User.find({});
  res.json(users);
}