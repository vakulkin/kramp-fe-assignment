import { Product } from '../../../types';
import ProductDetails from '../product-details/ProductDetails';
import styles from './ProductPage.module.css';

console.log('[ProductPage] module loaded');

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  console.log('[ProductPage] render');

  if (!product) {
    return (
      <div className={styles.page}>
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ProductDetails product={product} />
    </div>
  );
}
