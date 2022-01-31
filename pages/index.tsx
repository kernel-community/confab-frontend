import type {NextPage} from 'next';
import Main from 'layouts/Main';
import {Events} from 'components/composed/Events';
import {NextSeo} from 'next-seo';
import Link from 'next/link';
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
        <div className='
          lg:pl-64
          md:pl-12
          pl-12
        '>
          <div className="
              font-heading
              font-bold
              lg:text-7xl text-5xl
              text-primary
              lg:py-5
            ">
            Convo.
          </div>
          <div
            className="
                font-secondary
                text-lg
                text-kernel
                pt-12
              "
          >
            <Link href='/propose'>
              <span className='before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-highlight relative inline-block cursor-pointer'>
                <span className='relative text-primary'>
                  <span className='underline decoration-dotted'>
                    Start a Convo
                  </span>.
                </span>
              </span>
            </Link>
            &nbsp;Make a Friend.
          </div>
        </div>
        <div className='mt-12 px-12 lg:px-32 xl:px-40 2xl:px-52'>
          <div>
            <Events
              type='today'
              title='upcoming'
              highlight='today'
            />
          </div>
          <div className='mt-12'>
            <Events
              type='week'
              highlight='next 7 days'
            />
          </div>
        </div>
      </Main>
    </>
  );
};
export default Home;
