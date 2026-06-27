import styles from './LoadingCart.module.css';

console.log('[LoadingCart] module loaded');

export default function LoadingCart() {
  console.log('[LoadingCart] render');

  return (
    <div className={styles.empty}>
      <p>Loading cart details...</p>
    </div>
  );
}
