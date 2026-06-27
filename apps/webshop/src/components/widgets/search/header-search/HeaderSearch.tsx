import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchGraphQL } from '../../../../utils/fetchGraphQL';
import { SearchDialog } from '../search-dialog/SearchDialog';
import { useSearchStore } from '../../../../store/useSearchStore';
import styles from './HeaderSearch.module.css';

export function HeaderSearch() {
  const router = useRouter();
  const { query, results, isOpen, setQuery, setResults, setIsOpen } = useSearchStore();

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    let ignore = false;
    const fetchResults = async () => {
      try {
        const data = await fetchGraphQL<{ searchProducts: any[] }>(`
          query Search($q: String!) {
            searchProducts(query: $q) {
              id
              name
              price
              imageUrl
              description
              stock
              createdAt
            }
          }
        `, { q: query });

        if (!ignore && data?.searchProducts) {
          const res = data.searchProducts.slice(0, 5);
          setResults(res);
          setIsOpen(res.length > 0);
        }
      } catch (error) {
        console.error('Error fetching search results in Header:', error);
      }
    };

    fetchResults();

    return () => {
      ignore = true;
    };
  }, [query, setResults, setIsOpen]);

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

