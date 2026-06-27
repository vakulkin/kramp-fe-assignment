import { useMemo } from 'react';
import { SearchResult } from '../../../types';
import { SEO } from '../../widgets/seo/SEO';
import { groupBy } from '../../../utils/groupBy';
import SearchHeader from '../search-header/SearchHeader';
import NoResultsFound from '../no-results-found/NoResultsFound';
import GroupedCategorySection from '../grouped-category-section/GroupedCategorySection';
import styles from './SearchPage.module.css';

console.log('[SearchPage] module loaded');

interface SearchPageProps {
  query: string;
  results: SearchResult[];
}

export default function SearchPage({ query, results }: SearchPageProps) {
  console.log('[SearchPage] render');

  const grouped = useMemo(() => groupBy(results, 'category'), [results]);

  return (
    <>
      <SEO
        title={`Search results | Kramp Webshop`}
        description={`Showing search results"`}
      />
      <div className={styles.page}>
        <div className={styles.inner}>
          <SearchHeader query={query} />

          {!results.length && <NoResultsFound />}

          {Object.keys(grouped).map(category => (
            <GroupedCategorySection
              key={category}
              categoryName={category}
              products={grouped[category]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
