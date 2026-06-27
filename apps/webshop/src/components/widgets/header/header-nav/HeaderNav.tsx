import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './HeaderNav.module.css';

export function HeaderNav() {
  const router = useRouter();

  const isActivePage = (path: string) => {
    return router.pathname.indexOf(path) !== -1;
  };

  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        className={isActivePage('/') && router.pathname === '/' ? styles.activeLink : styles.navLink}
      >
        Home
      </Link>
      <Link
        href="/search"
        className={isActivePage('/search') ? styles.activeLink : styles.navLink}
      >
        Products
      </Link>
      <Link
        href="/checkout"
        className={isActivePage('/checkout') ? styles.activeLink : styles.navLink}
      >
        Checkout
      </Link>
    </nav>
  );
}
