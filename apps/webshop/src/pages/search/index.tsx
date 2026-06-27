import { GetStaticProps } from 'next';
import { SearchResult } from '../../types';
import SearchPage from '../../components/search/search-page/SearchPage';
import { fetchGraphQL } from '../../utils/fetchGraphQL';

export const getStaticProps: GetStaticProps<{ query: string; results: SearchResult[] }> = async () => {
  try {
    const data = await fetchGraphQL<{ searchProducts: SearchResult[] }>(`
      query SearchProducts($q: String!) {
        searchProducts(query: $q) {
          id
          name
          price
          imageUrl
          category
          stock
        }
      }
    `, { q: '' });

    const results = data?.searchProducts || [];

    return {
      props: {
        query: '',
        results,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching search results in getStaticProps for empty query:', error);

    return {
      props: {
        query: '',
        results: [],
      },
      revalidate: 60,
    };
  }
};

export default SearchPage;
