export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
};

export function formatMarketplacePrice(price: number, currency: string) {
  if (price === 0) return "Free";

  return `${CURRENCY_SYMBOLS[currency] ?? currency}${price.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}
