import Image from 'next/image';
import styles from './HeroSection.module.css';

console.log('[HeroSection] module loaded');

export default function HeroSection() {
  console.log('[HeroSection] render');

  return (
    <section className={styles.hero}>
      <Image
        src="https://placehold.co/1200x800/e63329/ffffff?text=Kramp+Webshop"
        alt="Kramp — Your industrial supply partner"
        width={1200}
        height={800}
        priority
        unoptimized
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
