// pages/buy-service.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BuyService() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [balance, setBalance] = useState(0);

  // Fetch services and user on page load
  useEffect(() => {
    fetchServices();
    fetchUser();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get('/api/services');
    setServices(res.data);
  };

  const fetchUser = async () => {
    const res = await axios.get('/api/user/profile');
    setUserEmail(res.data.email);
    setBalance(res.data.balance);
  };

  const handleBuy = async () => {
    if (!selectedService || !quantity || !link) {
      return setStatus('⚠️ Please fill all fields');
    }

    const total = selectedService.rate * (quantity / 1000) + 20; // +20 PKR profit

    if (total > balance) {
      return setStatus('❌ Insufficient balance');
    }

    setStatus('⏳ Placing your order...');

    try {
      const order = await axios.post('/api/order', {
        serviceId: selectedService.service,
        quantity,
        link,
        category: selectedService.category,
        price: total,
        userEmail,
      });

      if (order.data.success) {
        setStatus('✅ Order placed successfully!');
        fetchUser(); // update balance
      } else {
        setStatus('❌ Failed to place order');
      }
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buy SMM Service</h1>

      <select
        className="w-full border p-2 mb-4"
        onChange={(e) =>
          setSelectedService(services.find(s => s.service === e.target.value))
        }
      >
        <option value="">Select a service</option>
        {services.map(service => (
          <option key={service.service} value={service.service}>
            {service.name} ({service.category}) - PKR {service.rate}/1K
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full border p-2 mb-4"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="text"
        className="w-full border p-2 mb-4"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        onClick={handleBuy}
      >
        Buy Now
      </button>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}