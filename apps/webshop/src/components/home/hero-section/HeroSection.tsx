import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <img
        src="https://placehold.co/1200x800/e63329/ffffff?text=Kramp+Webshop"
        alt="Kramp — Your industrial supply partner"
        loading="lazy"
        className={styles.heroImage}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Industrial supplies, delivered.</h1>
        <p className={styles.heroSubtitle}>
          Tools, fasteners, safety equipment and power tools for professionals.
        </p>
      </div>
    </section>
  );
}
