import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = jwt_decode(token);
    fetch(`/api/user-data?email=${decoded.email}`)
      .then(res => res.json())
      .then(data => setBalance(data.balance));

    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">Your Balance: <b>{balance} PKR</b></p>

      <h2 className="text-xl mt-6">Available Services:</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {services.map(s => (
          <li key={s.service} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{s.name}</h3>
            <p>Category: {s.category}</p>
            <p>Price: {s.price_with_profit} PKR</p>
          </li>
        ))}
      </ul>
    </div>
  );
}