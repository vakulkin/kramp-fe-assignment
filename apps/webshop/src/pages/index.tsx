import { GetStaticProps } from 'next';
import { Product } from '../types';
import HomePage from '../components/home/home-page/HomePage';
import { fetchGraphQL } from '../utils/fetchGraphQL';

export const getStaticProps: GetStaticProps<{ featured: Product[] }> = async () => {
  const featured: Product[] = [];

  try {
    const data = await fetchGraphQL<{ featuredProducts: Product[] }>(`
      query GetFeaturedProducts {
        featuredProducts {
          id
          name
          price
          imageUrl
          stock
        }
      }
    `);

    if (data?.featuredProducts) {
      featured.push(...data.featuredProducts);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching featured products in getStaticProps:', errorMessage);
  }

  return {
    props: {
      featured,
    },
    revalidate: 60,
  };
};

export default HomePage;
