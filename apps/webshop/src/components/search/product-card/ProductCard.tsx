import Link from 'next/link';
import Image from 'next/image';
import { SearchResult } from '../../../types';
import { formatPrice } from '../../../utils/formatPrice';
import { useCartStore } from '../../../store/useCartStore';
import styles from './ProductCard.module.css';

console.log('[ProductCard] module loaded');

interface ProductCardProps {
  product: SearchResult;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log('[ProductCard] render', product.id);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div
      className={styles.card}
      data-testid="product-card"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
        unoptimized
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price} data-testid="product-price">{formatPrice(product.price)}</p>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <Link
            href={`/product/${product.id}`}
            className={styles.button}
            style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
          >
            View
          </Link>
          <div
            onClick={() => addToCart({ productId: product.id, stock: product.stock })}
            className={styles.button}
            style={{
              flex: 1,
              textAlign: 'center',
              backgroundColor: product.stock <= 0 ? '#ccc' : undefined,
              cursor: product.stock <= 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {product.stock > 0 ? 'Add' : 'Out of stock'}
          </div>
        </div>
      </div>
    </div>
  );
}
