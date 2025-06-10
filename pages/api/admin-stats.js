// pages/api/admin-stats.js
import { getSession } from 'next-auth/react';
import db from '../../utils/db';

const ADMIN_EMAIL = 'cdark283@gmail.com'; // your real admin email

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const usersCount = await db.user.count();
    const orders = await db.order.findMany();

    const totalRevenue = orders.reduce((sum, order) => sum + (order.price || 0), 0);

    res.status(200).json({
      users: usersCount,
      orders: orders.length,
      totalRevenue,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}