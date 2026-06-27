import ProductCard from '../../search/product-card/ProductCard';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  featured: any[];
}

export default function FeaturedProducts({ featured }: FeaturedProductsProps) {
  return (
    <section className={styles.featured}>
      <div className={styles.featuredHeader}>
        <h2>Featured products</h2>
        <p className={styles.timestamp}>
          Last updated: {new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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
