import { memo } from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './PriceSummary.module.css';

console.log('[PriceSummary] module loaded');

interface PriceSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  totalLabel?: string;
  totalClassName?: string;
}

// memo: only re-renders when price values change. Shared by CartSummary and OrderConfirmation.
const PriceSummary = memo(function PriceSummary({
  subtotal,
  shipping,
  tax,
  grandTotal,
  totalLabel = 'Total',
  totalClassName = styles.total,
}: PriceSummaryProps) {
  console.log('[PriceSummary] render');

  return (
    <>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>VAT (21% included)</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <div className={totalClassName}>
        <span>{totalLabel}</span>
        <strong>{formatPrice(grandTotal)}</strong>
      </div>
    </>
  );
});

export default PriceSummary;
