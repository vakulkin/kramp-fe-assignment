import { formatPrice } from '../../../utils/formatPrice';
import styles from './CartItem.module.css';

export interface CartItemDetail {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  imageUrl?: string;
}

interface CartItemProps {
  item: CartItemDetail;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {

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
          onClick={() => onRemove(item.productId)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
