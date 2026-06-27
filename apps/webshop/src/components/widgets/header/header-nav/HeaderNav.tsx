import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './HeaderNav.module.css';

console.log('[HeaderNav] module loaded');

export function HeaderNav() {
  console.log('[HeaderNav] render');

  const { pathname } = useRouter();

  const linkClasses = useMemo(() => ({
    home: pathname === '/' ? styles.activeLink : styles.navLink,
    products: pathname.startsWith('/search') ? styles.activeLink : styles.navLink,
    checkout: pathname.startsWith('/checkout') ? styles.activeLink : styles.navLink,
  }), [pathname]);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={linkClasses.home}>
        Home
      </Link>
      <Link href="/search" className={linkClasses.products}>
        Products
      </Link>
      <Link href="/checkout" className={linkClasses.checkout}>
        Checkout
      </Link>
    </nav>
  );
}
