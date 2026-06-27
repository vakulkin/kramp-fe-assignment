import { GetServerSideProps } from 'next';
import SearchPage from '../components/search/search-page/SearchPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = (context.query.q as string) || '';

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
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
    });
    const data = await res.json();
    const results = data.data?.searchProducts || [];

    return {
      props: {
        query: q,
        results,
      },
    };
  } catch (error) {
    console.error('Error fetching search results in getServerSideProps:', error);
    return {
      props: {
        query: q,
        results: [],
      },
    };
  }
};

export default SearchPage;
