export function applyProfit(base) {
  if (base <= 100) return base + 60;
  if (base <= 200) return base + 200;
  return base + 500;
}