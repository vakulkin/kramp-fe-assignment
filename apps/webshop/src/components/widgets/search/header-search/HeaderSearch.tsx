import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SearchDialog } from '../search-dialog/SearchDialog';
import { useSearchStore } from '../../../../store/useSearchStore';
import styles from './HeaderSearch.module.css';

export function HeaderSearch() {
  const router = useRouter();
  const { query, results, isOpen, setQuery, setResults, setIsOpen } = useSearchStore();

  // Data fetching is now handled seamlessly inside the store when setQuery is called.
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
      router.push(`/search/${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const truncatedQuery = query.substring(0, 30);

  return (
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
        <SearchDialog />
      )}
    </div>
  );
}

