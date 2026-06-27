import { memo } from 'react';
import { OrderItem } from '../../../types';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './ConfirmedItem.module.css';

console.log('[ConfirmedItem] module loaded');

interface ConfirmedItemProps {
  item: OrderItem;
}

const ConfirmedItem = memo(function ConfirmedItem({ item }: ConfirmedItemProps) {
  console.log('[ConfirmedItem] render', item.productId);

  return (
    <div className={styles.confirmedItem}>
      <span className={styles.itemName}>{item.name}</span>
      <span className={styles.itemQty}>×{item.quantity}</span>
      <span className={styles.itemPrice}>{formatPrice(item.total)}</span>
    </div>
  );
});

export default ConfirmedItem;
