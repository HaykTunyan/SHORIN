import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  const website = 'https://saf.selfstudio.dev/';
  const title = 'SHORIN Art Foundation';
  const description =
    'Добро пожаловать на личный сайт художника Дмитрия Шорина.';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={website}
        openGraph={{
          type: 'website',
          url: `${website}`,
          title,
          description,
          images: [
            {
              url: `${website}images/Shorin.png`,
              width: 1200,
              height: 630,
              alt: 'Shorin',
            },
          ],
        }}
      />
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg' />
      </Head>
        <Component {...pageProps} />
    </>
  );
}
