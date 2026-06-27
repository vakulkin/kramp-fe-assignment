import Link from 'next/link';
import styles from './CartIcon.module.css';

interface CartIconProps {
  count: number;
}

export function CartIcon({ count }: CartIconProps) {
  const label = count > 0 ? `Cart (${count})` : 'Cart';

  return (
    <Link
      href="/checkout"
      className={styles.cartIcon}
    >
      {count > 0 && (
        <span className={styles.badge}>{count}</span>
      )}
    </Link>
  );
}
