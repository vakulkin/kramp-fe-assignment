import Link from 'next/link';
import styles from './EmptyCart.module.css';

export default function EmptyCart() {
  return (
    <div className={styles.empty}>
      <p>Your cart is empty.</p>
      <Link href="/" className={styles.continueLink}>Continue shopping</Link>
    </div>
  );
}
