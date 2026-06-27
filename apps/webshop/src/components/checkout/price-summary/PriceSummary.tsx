import { formatPrice } from '../../../utils/formatPrice';
import styles from './PriceSummary.module.css';

interface PriceSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  totalLabel?: string;
  totalClassName?: string;
}

export default function PriceSummary({
  subtotal,
  shipping,
  tax,
  grandTotal,
  totalLabel = 'Total',
  totalClassName = styles.total,
}: PriceSummaryProps) {
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
}
