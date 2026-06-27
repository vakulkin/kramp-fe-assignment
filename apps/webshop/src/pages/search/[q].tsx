import { GetStaticProps, GetStaticPaths } from 'next';
import SearchPage from '../../components/search/search-page/SearchPage';
import { fetchGraphQL } from '../../utils/fetchGraphQL';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const rawQ = context.params?.q;
  const q = Array.isArray(rawQ) ? rawQ[0] : (rawQ || '');

  if (!q) {
    return {
      notFound: true,
    };
  }

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
      revalidate: 60,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching search results in getStaticProps:', errorMessage);
    
    return {
      props: {
        query: q,
        results: [],
      },
      revalidate: 60,
    };
  }
};

export default SearchPage;
