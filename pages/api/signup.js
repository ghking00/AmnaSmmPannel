import bcrypt from 'bcryptjs';
import { getUsers, saveUsers } from '../../backend/db';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { email, password } = req.body;
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  users.push({ email, password: hashed, balance: 0, role: 'user' });
  saveUsers(users);

  res.json({ success: true });
}
