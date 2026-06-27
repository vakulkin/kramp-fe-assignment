import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { groupBy } from '../../../utils/groupBy';
import SearchHeader from '../search-header/SearchHeader';
import SearchLoading from '../search-loading/SearchLoading';
import NoResultsFound from '../no-results-found/NoResultsFound';
import GroupedCategorySection from '../grouped-category-section/GroupedCategorySection';
import styles from './SearchPage.module.css';

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
