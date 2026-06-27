import Link from 'next/link';
import styles from './EmptyCart.module.css';

console.log('[EmptyCart] module loaded');

export default function EmptyCart() {
  console.log('[EmptyCart] render');

  return (
    <div className={styles.empty}>
      <p>Your cart is empty.</p>
      <Link href="/" className={styles.continueLink}>Continue shopping</Link>
    </div>
  );
}
