import { GetServerSideProps } from 'next';
import HomePage from '../components/home/home-page/HomePage';
import { fetchGraphQL } from '../utils/fetchGraphQL';

export const getServerSideProps: GetServerSideProps = async () => {
  const FEATURED_IDS = process.env.FEATURED_IDS?.split(',').filter(Boolean);
  const featured = [];

  if (FEATURED_IDS && FEATURED_IDS.length > 0) {
    try {
      const data = await fetchGraphQL<{ products: any[] }>(`
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
      `, { ids: FEATURED_IDS });

      if (data?.products) {
        featured.push(...data.products);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error fetching featured products in getServerSideProps:', errorMessage);
    }
  }

  return {
    props: {
      featured,
      timestamp: Date.now(),
    },
  };
};

export default HomePage;
