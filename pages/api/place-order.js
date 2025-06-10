import { getUsers, saveUsers, saveOrder, getOrders } from '../../backend/db';
import { applyProfit } from '../../utils/profitCalc';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, service, link, quantity } = req.body;

  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid user' });

  // Get service price from API
  const response = await fetch('https://dilsmmpanel.com/api/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: '1118b6e2f84e3092712f366c3e8be8fc0f467558',
      action: 'services'
    }),
  });
  const services = await response.json();
  const selected = services.find(s => s.service == service);
  if (!selected) return res.status(404).json({ error: 'Service not found' });

  const cost = applyProfit(Number(selected.rate)) * (quantity / 100);
  if (user.balance < cost) return res.status(400).json({ error: 'Insufficient balance' });

  // Place real order
  const orderRes = await fetch('https://dilsmmpanel.com/api/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: '1118b6e2f84e3092712f366c3e8be8fc0f467558',
      action: 'add',
      service,
      link,
      quantity
    })
  });

  const orderData = await orderRes.json();
  if (!orderData.order) return res.status(500).json({ error: 'Order failed', details: orderData });

  // Deduct balance
  user.balance -= cost;
  saveUsers(users);

  // Save order
  saveOrder({
    id: orderData.order,
    email,
    service,
    link,
    quantity,
    cost,
    status: 'Pending',
    time: new Date().toISOString()
  });

  res.json({ success: true, order: orderData.order });
}