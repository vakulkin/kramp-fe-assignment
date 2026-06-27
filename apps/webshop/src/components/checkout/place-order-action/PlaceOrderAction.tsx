import Link from 'next/link';
import styles from './PlaceOrderAction.module.css';

interface PlaceOrderActionProps {
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

export default function PlaceOrderAction({ onPlaceOrder, isPlacingOrder }: PlaceOrderActionProps) {
  return (
    <div className={styles.actions}>
      <button
        className={styles.placeOrderButton}
        onClick={onPlaceOrder}
        disabled={isPlacingOrder}
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          fontFamily: 'inherit',
          cursor: isPlacingOrder ? 'not-allowed' : 'pointer',
          opacity: isPlacingOrder ? 0.7 : 1,
        }}
      >
        {isPlacingOrder ? 'Placing order...' : 'Place order'}
      </button>
      <Link href="/" className={styles.continueLink}>Continue shopping</Link>
    </div>
  );
}
