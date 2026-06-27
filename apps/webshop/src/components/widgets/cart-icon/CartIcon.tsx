import { useRouter } from 'next/router';
import styles from './CartIcon.module.css';

interface CartIconProps {
  count: number;
}

export function CartIcon({ count }: CartIconProps) {
  const router = useRouter();
  const label = count > 0 ? `Cart (${count})` : 'Cart';

  return (
    <div
      onClick={() => router.push('/checkout')}
      className={styles.cartIcon}
    >
      <span className={styles.label}>{label}</span>
      {count > 0 && (
        <span className={styles.badge}>{count}</span>
      )}
    </div>
  );
}
