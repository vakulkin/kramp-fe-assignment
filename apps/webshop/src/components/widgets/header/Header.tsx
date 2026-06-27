import { memo } from 'react';
import { CartIcon } from '../cart-icon/CartIcon';
import { HeaderLogo } from './header-logo/HeaderLogo';
import { HeaderNav } from './header-nav/HeaderNav';
import { HeaderSearch } from '../search/header-search/HeaderSearch';
import styles from './Header.module.css';

console.log('[Header] module loaded');

export const Header = memo(function Header() {
  console.log('[Header] render');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <HeaderLogo />
        <HeaderNav />
        <HeaderSearch />
        <CartIcon />
      </div>
    </header>
  );
});
