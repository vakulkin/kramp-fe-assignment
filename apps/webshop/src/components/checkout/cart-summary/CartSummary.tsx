import PriceSummary from '../price-summary/PriceSummary';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

export default function CartSummary({ subtotal, shipping, tax, grandTotal }: CartSummaryProps) {
  return (
    <div className={styles.summary}>
      <PriceSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        grandTotal={grandTotal}
      />
    </div>
  );
}
