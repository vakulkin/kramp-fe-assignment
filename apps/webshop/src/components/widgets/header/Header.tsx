import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCartStore } from '../../../store/useCartStore';
import { SearchDialog } from '../search/search-dialog/SearchDialog';
import { CartIcon } from '../cart-icon/CartIcon';
import styles from './Header.module.css';

interface HeaderProps {
  query: string;
  setQuery: (q: string) => void;
  results: any[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Header({
  query,
  setQuery,
  results,
  isOpen,
  setIsOpen,
}: HeaderProps) {
  const router = useRouter();
  const totalItems = useCartStore(state => state.totalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setIsOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push('/search?q=' + encodeURIComponent(query));
      setIsOpen(false);
    }
  };

  const isActivePage = (path: string) => {
    return router.pathname.indexOf(path) !== -1;
  };

  const truncatedQuery = query.substring(0, 30);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Kramp
        </Link>

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

        <div className={styles.searchWrapper}>
          <input
            type="text"
            value={query}
            placeholder="Search products..."
            className={styles.searchInput}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={e => e.stopPropagation()}
          />
          {truncatedQuery && query.length > 30 && (
            <span className={styles.truncatedHint}>Searching: {truncatedQuery}…</span>
          )}
          {isOpen && (
            <SearchDialog
              results={results}
              onSelect={(id: string) => {
                router.push(`/product/${id}`);
                setIsOpen(false);
                setQuery('');
              }}
            />
          )}
        </div>

        <CartIcon count={mounted ? totalItems : 0} />
      </div>
    </header>
  );
}

