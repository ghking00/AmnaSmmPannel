// pages/order.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function OrderPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const fetchServices = async () => {
    try {
      const res = await axios.post('/api/get-services');
      setServices(res.data.services);
    } catch (error) {
      console.error('Error fetching services', error);
    }
  };

  const placeOrder = async () => {
    if (!selectedService || !link || quantity <= 0) {
      alert('Please fill all fields correctly');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/place-order', {
        service: selectedService.service,
        link,
        quantity,
      });

      if (res.data.success) {
        setStatus(`✅ Order Placed! Order ID: ${res.data.order}`);
      } else {
        setStatus(`❌ Failed: ${res.data.message}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Place an Order</h1>

      <div className="mb-4">
        <label className="block">Select Service:</label>
        <select
          className="border p-2 w-full"
          onChange={(e) =>
            setSelectedService(JSON.parse(e.target.value))
          }
        >
          <option value="">-- Select --</option>
          {services.map((s) => (
            <option key={s.service} value={JSON.stringify(s)}>
              {s.name} — PKR {Math.ceil(s.rate + 20)} / 1000
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block">Link:</label>
        <input
          className="border p-2 w-full"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block">Quantity:</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button
        onClick={placeOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Placing...' : 'Place Order'}
      </button>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}