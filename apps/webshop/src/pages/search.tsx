import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { groupBy } from '../utils/groupBy';
import ProductCard from '../components/ProductCard';
import styles from './search.module.css';

// ----------------------------------------------------
// Sub-components
// ----------------------------------------------------
interface SearchHeaderProps {
  query?: string;
}

function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <h1 className={styles.heading}>
      {query ? `Results for "${query}"` : 'All products'}
    </h1>
  );
}

function SearchLoading() {
  return <p>Loading...</p>;
}

function NoResultsFound() {
  return <p className={styles.empty}>No products found.</p>;
}

interface GroupedCategorySectionProps {
  categoryName: string;
  products: any[];
}

function GroupedCategorySection({ categoryName, products }: GroupedCategorySectionProps) {
  return (
    <section className={styles.category}>
      <h2 className={styles.categoryTitle}>{categoryName}</h2>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Main SearchPage Component
// ----------------------------------------------------
export default function SearchPage() {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = (router.query.q as string) || '';

    setIsLoading(true);

    fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query SearchProducts($q: String!) {
            searchProducts(query: $q) {
              id
              name
              price
              imageUrl
              category
              description
              stock
              createdAt
            }
          }
        `,
        variables: { q },
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('search results:', data);
        setResults(data.data.searchProducts);
        setIsLoading(false);
      });
  }, [router.query.q]);

  useEffect(() => {
    setFilteredResults(results);
  }, [results]);

  const grouped = groupBy(filteredResults, 'category');

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <SearchHeader query={router.query.q as string} />

        {isLoading && <SearchLoading />}

        {!isLoading && !filteredResults.length && <NoResultsFound />}

        {Object.keys(grouped).map(category => (
          <GroupedCategorySection
            key={category}
            categoryName={category}
            products={grouped[category]}
          />
        ))}
      </div>
    </div>
  );
}
