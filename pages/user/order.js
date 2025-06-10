import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Orders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (res.ok) setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  if (!session) return <p>Please log in first.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Link</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td className="border p-2">{order.order_id}</td>
                <td className="border p-2">{order.service_id}</td>
                <td className="border p-2">{order.link}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">PKR {order.price.toFixed(2)}</td>
                <td className="border p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}