import { useEffect, useState } from 'react';

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/admin-orders?key=amnapro0088')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th>Email</th><th>Service</th><th>Qty</th><th>Cost</th><th>Status</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td>{o.email}</td>
              <td>{o.service}</td>
              <td>{o.quantity}</td>
              <td>{o.cost}</td>
              <td>{o.status}</td>
              <td>{o.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}