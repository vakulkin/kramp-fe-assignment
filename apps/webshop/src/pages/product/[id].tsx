import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../_app';
import styles from './[id].module.css';

export default function ProductPage() {
  const router = useRouter();
  const { cart } = useContext(CartContext) as any;
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    if (!router.query.id) return;

    fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
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
        variables: { id: router.query.id },
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('product loaded:', data);
        setProduct(data.data.product);
      });
  }, [cart]);

  const handleAddToCart = () => {
    if (!product) return;

    cart.addToCart({
      productId: product.id,
    });
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <img
            src={product!.imageUrl}
            alt=""
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <p className={styles.category}>{product!.category}</p>
          <h1 className={styles.name}>{product!.name}</h1>
          <p className={styles.price}>€{product!.price.toFixed(2)}</p>
          <p className={styles.description}>{product!.description}</p>
          <p className={styles.meta}>
            Listed: {new Date(product!.createdAt).toLocaleDateString()}
            {' · '}
            {product!.stock} in stock
          </p>
          <div className={styles.addToCart} onClick={handleAddToCart}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}
