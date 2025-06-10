// pages/buy.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function BuyPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [message, setMessage] = useState("");

  // Fetch services from your real API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/services");
        setServices(res.data);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };

    fetchServices();
  }, []);

  const handleOrder = async () => {
    if (!selectedService || !link || !quantity) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("/api/order", {
        service: selectedService,
        link,
        quantity,
      });

      if (res.data.success) {
        setMessage("Order placed successfully!");
      } else {
        setMessage("Order failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Buy Service</h1>

      <div className="mb-4">
        <label className="block font-medium">Select Service</label>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">-- Select a Service --</option>
          {services.map((service) => (
            <option key={service.service} value={service.service}>
              {service.name} - PKR {service.price + 20}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Enter Link</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleOrder}
      >
        Place Order
      </button>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
      }
