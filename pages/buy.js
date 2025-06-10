// pages/buy.js

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { getServices, createOrder } from '@/lib/apiclient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const services = await getServices();

  return {
    props: {
      session,
      services
    }
  };
}

export default function BuyPage({ session, services }) {
  const [selected, setSelected] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleOrder = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await createOrder({
        service: selected,
        link,
        quantity
      });

      if (res.order) {
        setMessage(`✅ Order Placed! ID: ${res.order}`);
        router.push('/dashboard');
      } else {
        setMessage(`❌ Error: ${res.error || 'Failed'}`);
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Buy Services - Amna Rajpoot SmmPannel</title>
      </Head>

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Buy SMM Services</h1>

        <select
          className="w-full p-3 border rounded"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- Select Service --</option>
          {services.map((s) => (
            <option key={s.service} value={s.service}>
              {s.name} — Rs. {s.price_with_profit}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter link (e.g., Instagram post)"
          className="w-full p-3 border rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full p-3 border rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={10}
        />

        <button
          onClick={handleOrder}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          {loading ? 'Placing Order...' : 'Buy Now'}
        </button>

        {message && (
          <p className="text-center font-medium text-sm text-red-500">{message}</p>
        )}
      </div>
    </>
  );
}