import Head from 'next/head';

console.log('[SEO] module loaded');

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({
  title = 'Kramp Webshop',
  description = 'Kramp Webshop - The best place to buy agricultural parts and accessories'
}: SEOProps) {
  console.log('[SEO] render');

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
    </Head>
  );
}
