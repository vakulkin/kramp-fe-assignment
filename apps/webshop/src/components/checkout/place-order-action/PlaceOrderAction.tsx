import { memo } from 'react';
import Link from 'next/link';
import styles from './PlaceOrderAction.module.css';

console.log('[PlaceOrderAction] module loaded');

interface PlaceOrderActionProps {
  onPlaceOrder: () => void;
  isPlacingOrder: boolean;
}

// memo: only re-renders when isPlacingOrder changes or onPlaceOrder ref changes.
// Parent passes a useCallback-wrapped handler for stability.
const PlaceOrderAction = memo(function PlaceOrderAction({ onPlaceOrder, isPlacingOrder }: PlaceOrderActionProps) {
  console.log('[PlaceOrderAction] render');

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
});

export default PlaceOrderAction;
