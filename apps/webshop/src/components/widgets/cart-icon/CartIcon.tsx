import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../../store/useCartStore';
import styles from './CartIcon.module.css';

console.log('[CartIcon] module loaded');

export function CartIcon() {
  console.log('[CartIcon] render');

  const totalItems = useCartStore((state) => state.totalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? totalItems : 0;

  return (
    <Link href="/checkout" className={styles.cartIcon}>
      <span className={styles.label}>Cart</span>
      {count > 0 && (
        <span className={styles.badge}>{count}</span>
      )}
    </Link>
  );
}
