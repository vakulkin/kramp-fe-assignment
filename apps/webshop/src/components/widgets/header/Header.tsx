import { useState, useEffect } from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { CartIcon } from '../cart-icon/CartIcon';
import { HeaderLogo } from './header-logo/HeaderLogo';
import { HeaderNav } from './header-nav/HeaderNav';
import { HeaderSearch } from '../search/header-search/HeaderSearch';
import styles from './Header.module.css';

export function Header() {
  const totalItems = useCartStore(state => state.totalItems);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <HeaderLogo />
        <HeaderNav />
        <HeaderSearch />
        <CartIcon count={mounted ? totalItems : 0} />
      </div>
    </header>
  );
}

