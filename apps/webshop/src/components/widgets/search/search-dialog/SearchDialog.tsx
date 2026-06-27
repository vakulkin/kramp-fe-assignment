import styles from './SearchDialog.module.css';
import { formatPrice } from '../../../../utils/formatPrice';

interface SearchDialogProps {
  results: any[];
  onSelect: (id: string) => void;
}

export function SearchDialog({ results, onSelect }: SearchDialogProps) {
  if (!results.length) return null;

  return (
    <div className={styles.dialog}>
      {results.map((result) => (
        <div
          key={result.id}
          className={styles.item}
          onClick={() => onSelect(result.id)}
        >
          <span className={styles.itemName}>{result.name}</span>
          <span className={styles.itemPrice}>{formatPrice(result.price)}</span>
        </div>
      ))}
    </div>
  );
}
