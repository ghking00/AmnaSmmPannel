const API_BASE = process.env.NEXT_PUBLIC_PANEL_API;
const API_KEY = process.env.NEXT_PUBLIC_PANEL_KEY;

// Helper function to add 20 PKR profit to original price
function addProfit(price) {
  return price + 20;
}

// Generic API fetch function
export async function callPanelApi(endpoint, method = 'POST', body = {}) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.error || 'API call failed');
    }
    return data;
  } catch (err) {
    console.error('API Error:', err.message);
    throw err;
  }
}

// Get services list with profit added
export async function getServices() {
  const response = await callPanelApi('services');
  const updated = response.map(service => ({
    ...service,
    price_with_profit: addProfit(Number(service.rate))
  }));
  return updated;
}

// Create order
export async function createOrder(orderDetails) {
  return await callPanelApi('order', 'POST', orderDetails);
}

// Check order status
export async function getOrderStatus(orderId) {
  return await callPanelApi('status', 'POST', { order: orderId });
}
