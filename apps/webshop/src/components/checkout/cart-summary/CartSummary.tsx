import { memo } from 'react';
import PriceSummary from '../price-summary/PriceSummary';
import styles from './CartSummary.module.css';

console.log('[CartSummary] module loaded');

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

// memo: only re-renders when totals actually change (not on isPlacingOrder state etc.)
const CartSummary = memo(function CartSummary({ subtotal, shipping, tax, grandTotal }: CartSummaryProps) {
  console.log('[CartSummary] render');

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
});

export default CartSummary;
