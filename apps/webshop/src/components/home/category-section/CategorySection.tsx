import styles from './CategorySection.module.css';

console.log('[CategorySection] module loaded');

export default function CategorySection() {
  console.log('[CategorySection] render');

  return (
    <section className={styles.categories}>
      <h2>Shop by category</h2>
      <div className={styles.categoryGrid}>
        {['Tools', 'Fasteners', 'Safety Equipment', 'Power Tools'].map((cat) => (
          <a key={cat} href={`/search/${cat}`} className={styles.categoryCard}>
            {cat}
          </a>
        ))}
      </div>
    </section>
  );
}
