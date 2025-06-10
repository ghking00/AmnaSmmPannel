import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ADMIN_EMAIL = 'cdark283@gmail.com';

export default function AddBalance() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && session.user.email !== ADMIN_EMAIL) {
      router.push('/');
    }
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');

    const res = await fetch('/api/add-balance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, amount: parseFloat(amount) }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`✅ Balance added successfully!`);
      setEmail('');
      setAmount('');
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please login first.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💰 Admin: Add Balance to User</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block mb-1 font-medium">User Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Amount (PKR)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Balance
        </button>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}