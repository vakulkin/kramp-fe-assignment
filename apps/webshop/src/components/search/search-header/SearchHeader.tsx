import styles from './SearchHeader.module.css';

console.log('[SearchHeader] module loaded');

interface SearchHeaderProps {
  query?: string;
}

export default function SearchHeader({ query }: SearchHeaderProps) {
  console.log('[SearchHeader] render');

  return (
    <h1 className={styles.heading}>
      {query ? `Results for "${query}"` : 'All products'}
    </h1>
  );
}
