import { getUsers } from '../../backend/db';

export default function handler(req, res) {
  const { email } = req.query;
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ balance: user.balance });
}