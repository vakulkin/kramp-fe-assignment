import 'isomorphic-fetch';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { createContext, useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { Header } from '../components/widgets/header/Header';
import './styles.css';

export const CartContext = createContext<any>(null);

function CustomApp({ Component, pageProps }: AppProps) {
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  useEffect(() => {
    setSearchIsOpen(searchResults.length > 0);
  }, [searchResults]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: { q: searchQuery },
      }),
    })
      .then(res => res.json())
      .then(data => {
        setSearchResults(data.data.searchProducts.slice(0, 5));
      });
  }, [searchQuery]);

  return (
    <CartContext.Provider value={{ cart }}>
      <Head>
        <title>Kramp Webshop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header
        query={searchQuery}
        setQuery={setSearchQuery}
        results={searchResults}
        isOpen={searchIsOpen}
        setIsOpen={setSearchIsOpen}
      />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </CartContext.Provider>
  );
}

export default CustomApp;

