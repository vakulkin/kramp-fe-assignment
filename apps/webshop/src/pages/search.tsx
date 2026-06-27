import { GetServerSideProps } from 'next';
import SearchPage from '../components/search/search-page/SearchPage';
import { fetchGraphQL } from '../utils/fetchGraphQL';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rawQ = context.query.q;
  const q = Array.isArray(rawQ) ? rawQ[0] : (rawQ || '');

  try {
    const data = await fetchGraphQL<{ searchProducts: any[] }>(`
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
    `, { q });

    const results = data?.searchProducts || [];

    return {
      props: {
        query: q,
        results,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching search results in getServerSideProps:', errorMessage);
    
    return {
      props: {
        query: q,
        results: [],
      },
    };
  }
};

export default SearchPage;
