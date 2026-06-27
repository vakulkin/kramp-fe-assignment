import ProductCard from '../../search/product-card/ProductCard';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  featured: any[];
  timestamp: number;
}

export default function FeaturedProducts({ featured, timestamp }: FeaturedProductsProps) {
  return (
    <section className={styles.featured}>
      <div className={styles.featuredHeader}>
        <h2>Featured products</h2>
        <p className={styles.timestamp}>
          Last updated: {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>
      <div className={styles.grid}>
        {featured.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
