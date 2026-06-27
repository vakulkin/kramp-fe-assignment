import { memo } from 'react';
import { CartItemDetail } from '../../../types';
import CartItem from '../cart-item/CartItem';
import styles from './CartItemList.module.css';

console.log('[CartItemList] module loaded');

interface CartItemListProps {
  items: CartItemDetail[];
  onRemove: (productId: string) => void;
}

const CartItemList = memo(function CartItemList({ items, onRemove }: CartItemListProps) {
  console.log('[CartItemList] render');

  return (
    <div className={styles.items}>
      {items.map((item) => (
        <CartItem key={item.productId} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
});

export default CartItemList;
