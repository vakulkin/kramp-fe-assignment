import styles from './CategorySection.module.css';

export default function CategorySection() {
  return (
    <section className={styles.categories}>
      <h2>Shop by category</h2>
      <div className={styles.categoryGrid}>
        {['Tools', 'Fasteners', 'Safety Equipment', 'Power Tools'].map((cat, index) => (
          <a key={index} href={`/search?q=${cat}`} className={styles.categoryCard}>
            {cat}
          </a>
        ))}
      </div>
    </section>
  );
}
