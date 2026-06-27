import { useContext } from 'react';
import { CartContext } from '../../../pages/_app';
import ProductDetails from '../product-details/ProductDetails';
import styles from './ProductPage.module.css';

interface ProductPageProps {
  product: any;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { cart } = useContext(CartContext) as any;

  const handleAddToCart = () => {
    if (!product) return;

    cart.addToCart({
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

