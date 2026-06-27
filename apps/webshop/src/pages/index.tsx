import { GetServerSideProps } from 'next';
import HomePage from '../components/home/home-page/HomePage';

export const getServerSideProps: GetServerSideProps = async () => {
  const FEATURED_IDS = ['1', '4', '11', '17'];
  const featured = [];

  for (const id of FEATURED_IDS) {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetProduct($id: ID!) {
              product(id: $id) {
                id
                name
                price
                imageUrl
                description
                category
                stock
                createdAt
              }
            }
          `,
          variables: { id },
        }),
      });
      const data = await res.json();
      if (data.data?.product) {
        featured.push(data.data.product);
      }
    } catch (e) { }
  }

  return {
    props: {
      featured,
      timestamp: Date.now(),
    },
  };
};

export default HomePage;
