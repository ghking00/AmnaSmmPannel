// lib/apiclient.js
const API_KEY = process.env.DILSMM_API_KEY; // from .env.local

export async function placeOrder(service, link, quantity) {
  const res = await fetch('https://dilsmmpanel.com/api/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: API_KEY,
      action: 'add',
      service,
      link,
      quantity,
    }),
  });

  const data = await res.json();
  return data;
}
