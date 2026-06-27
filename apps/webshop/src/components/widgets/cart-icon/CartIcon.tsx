import Link from 'next/link';
import styles from './CartIcon.module.css';

interface CartIconProps {
  count: number;
}

export function CartIcon({ count }: CartIconProps) {
  return (
    <Link
      href="/checkout"
      className={styles.cartIcon}
    >
      <span className={styles.label}>Cart</span>
      {count > 0 && (
        <span className={styles.badge}>{count}</span>
      )}
    </Link>
  );
}
