import Link from 'next/link';
import styles from './SearchDialog.module.css';
import { formatPrice } from '../../../../utils/formatPrice';
import { useSearchStore } from '../../../../store/useSearchStore';

export function SearchDialog() {
  const { results, resetSearch } = useSearchStore();

  if (!results.length) return null;

  return (
    <div className={styles.dialog}>
      {results.map((result) => (
        <Link
          key={result.id}
          href={`/product/${result.id}`}
          className={styles.item}
          onClick={() => resetSearch()}
          style={{ textDecoration: 'none' }}
        >
          <span className={styles.itemName}>{result.name}</span>
          <span className={styles.itemPrice}>{formatPrice(result.price)}</span>
        </Link>
      ))}
    </div>
  );
}
