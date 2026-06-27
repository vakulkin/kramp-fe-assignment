import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../components/widgets/header/Header';
import { SEO } from '../components/widgets/seo/SEO';
import './styles.css';

console.log('[App] module loaded');

function App({ Component, pageProps }: AppProps) {
  console.log('[App] render');

  return (
    <>
      <SEO />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
