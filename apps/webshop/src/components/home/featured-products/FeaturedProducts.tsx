import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import ProductCard from '../../search/product-card/ProductCard';
import styles from './FeaturedProducts.module.css';

console.log('[FeaturedProducts] module loaded');

interface FeaturedProductsProps {
  featured: Product[];
}

export default function FeaturedProducts({ featured }: FeaturedProductsProps) {
  console.log('[FeaturedProducts] render');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.featured}>
      <div className={styles.featuredHeader}>
        <h2>Featured products</h2>
        <p className={styles.timestamp}>
          Last updated:{' '}
          {mounted
            ? new Date().toLocaleTimeString('en-GB', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            : ''}
        </p>
      </div>
      <div className={styles.grid}>
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
