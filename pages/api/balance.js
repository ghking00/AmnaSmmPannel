// pages/api/balance.js
import { getSession } from 'next-auth/react';
import db from '../../utils/db'; // Your DB utility

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { balance: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error('Balance fetch error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}