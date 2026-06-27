import { useCartStore } from '../../../store/useCartStore';
import ProductDetails from '../product-details/ProductDetails';
import styles from './ProductPage.module.css';

interface ProductPageProps {
  product: any;
}

export default function ProductPage({ product }: ProductPageProps) {
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      productId: product.id,
    });
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
}

