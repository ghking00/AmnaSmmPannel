import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers } from '../../backend/db';

const SECRET = 'amna-smm-secret';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Wrong password' });

  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, { expiresIn: '7d' });

  res.json({ token });
}