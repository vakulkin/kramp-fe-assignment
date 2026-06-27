import { GetServerSideProps } from 'next';
import ProductPage from '../../components/product/product-page/ProductPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (!id) {
    return {
      props: {
        product: null,
      },
    };
  }

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
              description
              price
              category
              imageUrl
              stock
              createdAt
            }
          }
        `,
        variables: { id },
      }),
    });
    const data = await res.json();
    const product = data.data?.product || null;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product in getServerSideProps:', error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductPage;
