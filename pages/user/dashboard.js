import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await fetch('/api/balance');
      const data = await res.json();
      if (res.ok) setBalance(data.balance);
    };
    fetchBalance();
  }, []);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please log in to continue.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user.email}</h1>
      <p className="mt-4 text-lg">Balance: PKR {balance.toFixed(2)}</p>
      <div className="mt-6">
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}