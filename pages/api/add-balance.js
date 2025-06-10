// pages/api/add-balance.js
import { getSession } from 'next-auth/react';
import db from '../../utils/db';

const ADMIN_EMAIL = 'cdark283@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session || session.user.email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { email, amount } = req.body;

  if (!email || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await db.user.update({
      where: { email },
      data: { balance: user.balance + amount },
    });

    res.status(200).json({ success: true, newBalance: updatedUser.balance });
  } catch (error) {
    console.error('Add Balance Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}