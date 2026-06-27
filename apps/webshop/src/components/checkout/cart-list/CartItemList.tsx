import CartItem, { CartItemDetail } from '../cart-item/CartItem';
import styles from './CartItemList.module.css';

interface CartItemListProps {
  items: CartItemDetail[];
  onRemove: (productId: string) => void;
}

export default function CartItemList({ items, onRemove }: CartItemListProps) {
  return (
    <div className={styles.items}>
      {items.map((item: CartItemDetail) => (
        <CartItem key={item.productId} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
