import { useEffect, useState } from 'react';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Available Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.service} className="border p-2 rounded mb-2">
            <strong>{service.name}</strong>
            <p>{service.description}</p>
            <p className="text-green-600 font-bold">PKR {service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
