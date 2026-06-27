import 'isomorphic-fetch';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '../components/widgets/header/Header';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kramp Webshop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;

