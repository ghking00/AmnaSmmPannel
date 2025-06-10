// pages/api/orders.js
import { getSession } from 'next-auth/react';
import db from '../../utils/db'; // Adjust path if needed

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orders = await db.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}