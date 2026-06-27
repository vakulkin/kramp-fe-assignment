import styles from './LoadingCart.module.css';

export default function LoadingCart() {
  return (
    <div className={styles.empty}>
      <p>Loading cart details...</p>
    </div>
  );
}
