import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {NextSeo} from 'next-seo';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <NextSeo
        titleTemplate="Convo | %s"
        description="A home for conversations taking place in the Kernel network"
        openGraph={{
          url: 'https://convo.kernel.community',
          title: 'KERNEL Conversations',
          description: 'A home for conversations taking place in the Kernel network',
          images: [
            {
              url: 'https://confab-frontend.vercel.app/images/banner.jpg',
              alt: 'KERNEL squares and circles',
              type: 'image/jpeg',
            },
          ],
          site_name: 'KERNEL Convo',
        }}
        twitter={{
          handle: '@kernel0x',
          site: 'https://kernel.community',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;600;700;800;900&display=swap',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,300;0,400;0,500;0,700;0,800;1,300;1,400;1,500;1,700;1,800&display=swap',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
