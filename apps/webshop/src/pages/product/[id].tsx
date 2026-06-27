import { GetStaticProps, GetStaticPaths } from 'next';
import { Product } from '../../types';
import ProductPage from '../../components/product/product-page/ProductPage';
import { fetchGraphQL } from '../../utils/fetchGraphQL';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{ product: Product }> = async (context) => {
  const rawId = context.params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    return { notFound: true };
  }

  try {
    const data = await fetchGraphQL<{ product: Product }>(`
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

    if (!product) {
      return { notFound: true };
    }

    return {
      props: { product },
      revalidate: 60,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching product in getStaticProps:', errorMessage);
    return { notFound: true };
  }
};

export default ProductPage;
