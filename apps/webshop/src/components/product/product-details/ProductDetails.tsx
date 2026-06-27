import { formatPrice } from '../../../utils/formatPrice';
import styles from './ProductDetails.module.css';

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
  onAddToCart: () => void;
}

export default function ProductDetails({ product, onAddToCart }: ProductDetailsProps) {
  return (
    <div className={styles.inner}>
      <div className={styles.imageWrapper}>
        <img
          src={product.imageUrl}
          alt=""
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
        <div className={styles.addToCart} onClick={onAddToCart}>
          Add to cart
        </div>
      </div>
    </div>
  );
}
