import { GetStaticProps } from 'next';
import HomePage from '../components/home/home-page/HomePage';
import { fetchGraphQL } from '../utils/fetchGraphQL';

export const getStaticProps: GetStaticProps = async () => {
  const featured = [];

  try {
    const data = await fetchGraphQL<{ featuredProducts: any[] }>(`
      query GetFeaturedProducts {
        featuredProducts {
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
