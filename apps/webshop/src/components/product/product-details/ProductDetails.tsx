import Image from 'next/image';
import { SEO } from '../../widgets/seo/SEO';
import { formatPrice } from '../../../utils/formatPrice';
import { useCartStore } from '../../../store/useCartStore';
import styles from './ProductDetails.module.css';

console.log('[ProductDetails] module loaded');

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    createdAt: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  console.log('[ProductDetails] render');

  // Only the action (stable Zustand ref) is read — adding to cart won't re-render this.
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <SEO
        title={`${product.name} | Kramp Webshop`}
        description={product.description}
      />
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={1200}
            height={800}
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.meta}>
            Listed: {new Date(product.createdAt).toLocaleDateString()}
            {' · '}
            {product.stock} in stock
          </p>
          <div
            className={`${styles.addToCart} ${product.stock <= 0 ? styles.disabled : ''}`}
            onClick={() => addToCart({ productId: product.id, stock: product.stock })}
          >
            {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
          </div>
        </div>
      </div>
    </>
  );
}
