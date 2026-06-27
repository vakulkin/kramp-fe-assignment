import styles from './SearchHeader.module.css';

interface SearchHeaderProps {
  query?: string;
}

export default function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <h1 className={styles.heading}>
      {query ? `Results for "${query}"` : 'All products'}
    </h1>
  );
}
