import Link from 'next/link';
import ConfirmedItem from '../confirmed-item/ConfirmedItem';
import PriceSummary from '../price-summary/PriceSummary';
import styles from './OrderConfirmation.module.css';

interface OrderConfirmationProps {
  placedOrder: any;
}

export default function OrderConfirmation({ placedOrder }: OrderConfirmationProps) {
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
          {(placedOrder.items || []).map((item: any) => (
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
}
