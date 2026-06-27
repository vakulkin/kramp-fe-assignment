import { SEO } from '../../widgets/seo/SEO';
import { groupBy } from '../../../utils/groupBy';
import SearchHeader from '../search-header/SearchHeader';
import NoResultsFound from '../no-results-found/NoResultsFound';
import GroupedCategorySection from '../grouped-category-section/GroupedCategorySection';
import styles from './SearchPage.module.css';

interface SearchPageProps {
  query: string;
  results: any[];
}

export default function SearchPage({ query, results }: SearchPageProps) {
  const grouped = groupBy(results, 'category');

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
