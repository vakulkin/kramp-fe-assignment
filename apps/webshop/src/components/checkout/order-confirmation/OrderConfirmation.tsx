import { memo } from 'react';
import Link from 'next/link';
import { Order } from '../../../types';
import ConfirmedItem from '../confirmed-item/ConfirmedItem';
import PriceSummary from '../price-summary/PriceSummary';
import styles from './OrderConfirmation.module.css';

console.log('[OrderConfirmation] module loaded');

interface OrderConfirmationProps {
  placedOrder: Order;
}

const OrderConfirmation = memo(function OrderConfirmation({ placedOrder }: OrderConfirmationProps) {
  console.log('[OrderConfirmation] render');

  return (
    <div className={styles.confirmation}>
      <div className={styles.checkmarkIcon}>✓</div>
      <h1>Order Placed Successfully!</h1>
      <p className={styles.orderNumber}>
        Order Number: <code>{placedOrder.id}</code>
      </p>
      <div className={styles.orderSummaryCard}>
        <h3>Order Details Summary</h3>
        <div className={styles.confirmedItems}>
          {placedOrder.items.map((item) => (
            <ConfirmedItem key={item.productId} item={item} />
          ))}
        </div>
        <PriceSummary
          subtotal={placedOrder.subtotal}
          shipping={placedOrder.shipping}
          tax={placedOrder.tax}
          grandTotal={placedOrder.grandTotal}
          totalLabel="Grand Total"
          totalClassName={styles.totalRow}
        />
      </div>
      <p className={styles.thankYouNote}>
        Thank you for your order. A confirmation email and invoice details will be sent shortly.
      </p>
      <Link href="/" className={styles.continueShoppingBtn}>
        Continue shopping
      </Link>
    </div>
  );
});

export default OrderConfirmation;
