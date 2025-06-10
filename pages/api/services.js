import { applyProfit } from '../../utils/profitCalc';

export default async function handler(req, res) {
  const response = await fetch('https://dilsmmpanel.com/api/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: '1118b6e2f84e3092712f366c3e8be8fc0f467558',
      action: 'services'
    })
  });

  const services = await response.json();

  const updated = services.map(service => ({
    ...service,
    price_with_profit: applyProfit(Number(service.rate))
  }));

  res.json(updated);
}