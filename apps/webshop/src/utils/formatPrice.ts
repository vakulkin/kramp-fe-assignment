export function formatPrice(price: number): string {
  const currencySign = process.env.NEXT_PUBLIC_CURRENCY_SIGN || '€';
  return `${currencySign}${price.toFixed(2)}`;
}
