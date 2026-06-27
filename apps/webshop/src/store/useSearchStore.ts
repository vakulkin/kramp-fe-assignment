import { create } from 'zustand';

interface SearchState {
  query: string;
  results: any[];
  isOpen: boolean;
  setQuery: (query: string) => void;
  setResults: (results: any[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  results: [],
  isOpen: false,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIsOpen: (isOpen) => set({ isOpen }),
  resetSearch: () => set({ query: '', results: [], isOpen: false }),
}));
