import type {NextPage} from 'next';
import Main from '../layouts/Main';
import {Events} from '../components/composed/Events';
import {NextSeo} from 'next-seo';

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title='Home'
        openGraph={{
          url: `https://convo.kernel.community`,
          title: `KERNEL Convo`,
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
      />
      <Main>
        <Events
          type='live'
        />
        <Events
          type='upcoming'
        />
        <Events
          type='past'
        />
      </Main>
    </>
  );
};
export default Home;
