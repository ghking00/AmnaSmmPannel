import { getOrders } from '../../backend/db';

export default function handler(req, res) {
  const { key } = req.query;
  if (key !== 'amnapro0088') return res.status(403).json({ error: 'Unauthorized' });

  const orders = getOrders();
  res.json(orders);
}