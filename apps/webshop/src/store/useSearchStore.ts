import { create } from 'zustand';
import debounce from 'lodash/debounce';
import { fetchGraphQL } from '../utils/fetchGraphQL';

interface SearchState {
  query: string;
  results: any[];
  isOpen: boolean;
  setQuery: (query: string) => void;
  setResults: (results: any[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => {
  const fetchResultsDebounced = debounce(async (query: string) => {
    if (!query) {
      set({ results: [], isOpen: false });
      return;
    }

    try {
      const data = await fetchGraphQL<{ searchProducts: any[] }>(`
        query Search($q: String!) {
          searchProducts(query: $q) {
            id
            name
            price
          }
        }
      `, { q: query });

      if (data?.searchProducts) {
        const res = data.searchProducts.slice(0, 5);
        set({ results: res, isOpen: res.length > 0 });
      }
    } catch (error) {
      console.error('Error fetching search results in store:', error);
    }
  }, 300);

  return {
    query: '',
    results: [],
    isOpen: false,
    setQuery: (query) => {
      set({ query });
      fetchResultsDebounced(query);
    },
    setResults: (results) => set({ results }),
    setIsOpen: (isOpen) => set({ isOpen }),
    resetSearch: () => set({ query: '', results: [], isOpen: false }),
  };
});
