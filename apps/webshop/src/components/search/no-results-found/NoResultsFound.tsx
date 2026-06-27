import styles from './NoResultsFound.module.css';

console.log('[NoResultsFound] module loaded');

export default function NoResultsFound() {
  console.log('[NoResultsFound] render');

  return <p className={styles.empty}>No products found.</p>;
}
