import ProductCard from '../product-card/ProductCard';
import styles from './GroupedCategorySection.module.css';

interface GroupedCategorySectionProps {
  categoryName: string;
  products: any[];
}

export default function GroupedCategorySection({ categoryName, products }: GroupedCategorySectionProps) {
  return (
    <section className={styles.category}>
      <h2 className={styles.categoryTitle}>{categoryName}</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
