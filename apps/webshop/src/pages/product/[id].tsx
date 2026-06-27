import { GetServerSideProps } from 'next';
import ProductPage from '../../components/product/product-page/ProductPage';
import { fetchGraphQL } from '../../utils/fetchGraphQL';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rawId = context.params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    return {
      props: {
        product: null,
      },
    };
  }

  try {
    const data = await fetchGraphQL<{ product: any }>(`
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          name
          description
          price
          category
          imageUrl
          stock
          createdAt
        }
      }
    `, { id });

    const product = data?.product || null;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching product in getServerSideProps:', errorMessage);
    
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductPage;
