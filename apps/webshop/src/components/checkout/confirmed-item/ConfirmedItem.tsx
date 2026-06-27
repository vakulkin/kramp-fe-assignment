import { formatPrice } from '../../../utils/formatPrice';
import styles from './ConfirmedItem.module.css';

interface ConfirmedItemProps {
  item: any;
}

export default function ConfirmedItem({ item }: ConfirmedItemProps) {
  return (
    <div className={styles.confirmedItem}>
      <span className={styles.itemName}>{item.name}</span>
      <span className={styles.itemQty}>×{item.quantity}</span>
      <span className={styles.itemPrice}>{formatPrice(item.total)}</span>
    </div>
  );
}
