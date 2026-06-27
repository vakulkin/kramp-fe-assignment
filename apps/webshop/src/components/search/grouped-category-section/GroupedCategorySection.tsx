import { SearchResult } from '../../../types';
import ProductCard from '../product-card/ProductCard';
import styles from './GroupedCategorySection.module.css';

console.log('[GroupedCategorySection] module loaded');

interface GroupedCategorySectionProps {
  categoryName: string;
  products: SearchResult[];
}

export default function GroupedCategorySection({ categoryName, products }: GroupedCategorySectionProps) {
  console.log('[GroupedCategorySection] render', categoryName);

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
