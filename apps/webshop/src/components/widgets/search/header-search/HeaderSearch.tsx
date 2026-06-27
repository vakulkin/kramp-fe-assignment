import { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { SearchDialog } from '../search-dialog/SearchDialog';
import { useSearchStore } from '../../../../store/useSearchStore';
import styles from './HeaderSearch.module.css';

console.log('[HeaderSearch] module loaded');

export function HeaderSearch() {
  console.log('[HeaderSearch] render');

  const query = useSearchStore((state) => state.query);
  const isOpen = useSearchStore((state) => state.isOpen);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setIsOpen = useSearchStore((state) => state.setIsOpen);

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      Router.push(`/search/${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        className={styles.searchInput}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      />
      {query.length > 30 && (
        <span className={styles.truncatedHint}>Searching: {query.substring(0, 30)}…</span>
      )}
      {isOpen && <SearchDialog />}
    </div>
  );
}
