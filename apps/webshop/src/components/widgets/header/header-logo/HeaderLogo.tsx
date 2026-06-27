import Link from 'next/link';
import styles from './HeaderLogo.module.css';

console.log('[HeaderLogo] module loaded');

export function HeaderLogo() {
  console.log('[HeaderLogo] render');

  return (
    <Link href="/" className={styles.logo}>
      Kramp
    </Link>
  );
}
