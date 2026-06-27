import React from 'react';
import { useRouter } from 'next/router';
import { formatPrice } from '../../../utils/formatPrice';
import { useCartStore } from '../../../store/useCartStore';
import styles from './ProductCard.module.css';

const ProductCard: React.FC<any> = ({ product }) => {
  const router = useRouter();
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div
      className={styles.card}
      data-testid="product-card"
    >
      <img
        src={product.imageUrl}
        alt=""
        width="300"
        height="200"
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price} data-testid="product-price">{formatPrice(product.price)}</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <div
            onClick={() => router.push(`/product/${product.id}`)}
            className={styles.button}
            style={{ flex: 1, textAlign: 'center' }}
          >
            View
          </div>
          <div
            onClick={() => addToCart({ productId: product.id, stock: product.stock })}
            className={styles.button}
            style={{ flex: 1, textAlign: 'center', backgroundColor: product.stock <= 0 ? '#ccc' : undefined, cursor: product.stock <= 0 ? 'not-allowed' : 'pointer' }}
          >
            {product.stock > 0 ? 'Add' : 'Out of stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
