export function calculateProfitPrice(basePrice) {
  if (basePrice <= 100) return basePrice + 60;
  if (basePrice <= 200) return basePrice + 200;
  return basePrice + 500;
}
