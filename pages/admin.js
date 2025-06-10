import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ADMIN_EMAIL = 'cdark283@gmail.com'; // Your real admin email

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (status === 'authenticated' && session.user.email !== ADMIN_EMAIL) {
      router.push('/'); // Redirect if not admin
    }
  }, [session, status]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/admin-stats');
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    };
    fetchStats();
  }, []);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please login first.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">👑 Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">{stats.orders}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold">Total Revenue</h2>
          <p className="text-2xl">PKR {stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
