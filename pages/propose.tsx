import type {NextPage} from 'next';
import Main from '../layouts/Main';
import ProposeForm from '../components/composed/Propose';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import Link from 'next/link';

const Propose: NextPage = () => {
  const router = useRouter();
  const url = router.asPath;
  return (
    <>
      <NextSeo
        title="Propose"
        description="KERNEL Conversations is a home for conversations taking place in the Kernel network. Propose a new Conversation in KERNEL network."
        openGraph={{
          url: `https://convo.kernel.community${url}`,
          title: 'Convo | Propose',
          description: 'Propose a new Conversation in KERNEL network',
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
        <div className="flex flex-col justify-center">
          <div className="
            font-heading
            font-extrabold
            mx-auto
            sm:text-5xl
            text-5xl
            text-gray-800
          ">
            Propose a Conversation
            <Link href="/about">
              <div className='text-base font-bold mt-2 underline cursor-pointer'>
              what is a junto / guild?
              </div>
            </Link>
          </div>
          <div className="border border-gray-800 my-12 mx-15 border-opacity-50">
          </div>
        </div>
        <div className='md:px-24'>
          <ProposeForm />
        </div>
      </Main>
    </>
  );
};
export default Propose;
