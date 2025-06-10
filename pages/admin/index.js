// pages/admin/index.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Simple admin protection using query ?key=amnapro0088
  useEffect(() => {
    const key = router.query.key;
    if (key !== 'amnapro0088') {
      router.push('/');
    }
  }, [router.query]);

  useEffect(() => {
    fetch('/api/admin/getUsers')
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch('/api/admin/getOrders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalProfit = totalOrders * 20; // 20 PKR profit per order

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold">👤 Total Users</h2>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold">📦 Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold">💰 Total Profit (PKR)</h2>
          <p className="text-3xl font-bold mt-2">{totalProfit}</p>
        </div>
      </div>
    </div>
  );
}
