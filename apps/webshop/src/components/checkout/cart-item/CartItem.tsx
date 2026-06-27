import { memo, useCallback } from 'react';
import { CartItemDetail } from '../../../types';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './CartItem.module.css';

console.log('[CartItem] module loaded');

interface CartItemProps {
  item: CartItemDetail;
  onRemove: (productId: string) => void;
}

const CartItem = memo(function CartItem({ item, onRemove }: CartItemProps) {
  console.log('[CartItem] render', item.productId);

  const handleRemove = useCallback(() => {
    onRemove(item.productId);
  }, [onRemove, item.productId]);

  return (
    <div className={styles.item}>
      <div className={styles.itemMainInfo}>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemQty}>×{item.quantity}</span>
      </div>
      <div className={styles.itemActions}>
        <span className={styles.itemPrice}>{formatPrice(item.total)}</span>
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
});

export default CartItem;
