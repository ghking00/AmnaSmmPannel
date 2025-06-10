import axios from 'axios';
import db from '../../utils/db'; // Your DB connection utility
import { getSession } from 'next-auth/react'; // Or your auth system

const API_KEY = '1118b6e2f84e3092712f366c3e8be8fc0f467558';
const BASE_URL = 'https://dilsmmpanel.com/api/v2';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { service, link, quantity } = req.body;
  if (!service || !link || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await db.user.findUnique({ where: { email: session.user.email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Get real rate from dilsmmpanel
    const serviceInfo = await axios.post(`${BASE_URL}`, {
      key: API_KEY,
      action: 'services',
    });

    const matched = serviceInfo.data.find((s) => s.service == service);
    if (!matched) return res.status(404).json({ error: 'Service not found in API' });

    const ratePer1k = matched.rate;
    const cost = ((ratePer1k / 1000) * quantity) + 20; // Apply 20 PKR profit

    if (user.balance < cost) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Place order
    const orderResponse = await axios.post(`${BASE_URL}`, {
      key: API_KEY,
      action: 'add',
      service,
      link,
      quantity,
    });

    if (orderResponse.data.error) {
      return res.status(500).json({ error: 'API order failed', details: orderResponse.data.error });
    }

    // Deduct balance and store order
    const orderId = orderResponse.data.order;
    await db.user.update({
      where: { email: session.user.email },
      data: {
        balance: { decrement: cost },
        orders: {
          create: {
            service_id: service,
            link,
            quantity,
            price: cost,
            order_id: orderId,
            status: 'Pending',
          },
        },
      },
    });

    return res.status(200).json({ success: true, order: orderId });
  } catch (err) {
    console.error('Order error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}