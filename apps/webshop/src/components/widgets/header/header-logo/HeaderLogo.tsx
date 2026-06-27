import Link from 'next/link';
import styles from './HeaderLogo.module.css';

export function HeaderLogo() {
  return (
    <Link href="/" className={styles.logo}>
      Kramp
    </Link>
  );
}
