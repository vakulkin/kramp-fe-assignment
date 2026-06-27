import { GetServerSideProps } from 'next';
import HomePage from '../components/home/home-page/HomePage';

export const getServerSideProps: GetServerSideProps = async () => {
  const FEATURED_IDS = process.env.FEATURED_IDS?.split(',').filter(Boolean);
  const featured = [];

  if (FEATURED_IDS && FEATURED_IDS.length > 0) {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query GetProducts($ids: [ID!]!) {
              products(ids: $ids) {
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
          variables: { ids: FEATURED_IDS },
        }),
      });
      const data = await res.json();
      if (data.data?.products) {
        featured.push(...data.data.products);
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
