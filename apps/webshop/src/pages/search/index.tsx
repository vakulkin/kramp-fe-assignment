import { GetStaticProps } from 'next';
import SearchPage from '../../components/search/search-page/SearchPage';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      query: '',
      results: [],
    },
    revalidate: 60,
  };
};

export default SearchPage;
