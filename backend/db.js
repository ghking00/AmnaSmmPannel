import fs from 'fs';
const DB_FILE = 'backend/users.json';

export function getUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}
import fs from 'fs';
import path from 'path';

const ordersPath = path.resolve('data', 'orders.json');

export function getOrders() {
  if (!fs.existsSync(ordersPath)) return [];
  return JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
}

export function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}
