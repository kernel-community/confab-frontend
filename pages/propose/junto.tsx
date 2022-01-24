import type {NextPage} from 'next';
import Main from '../../layouts/Main';
import ProposeForm from '../../components/composed/Propose';
import {NextSeo} from 'next-seo';
import { useRouter } from 'next/router';

const Propose: NextPage = () => {
  const router = useRouter();
  const url = 'https://convo.kernel.community' + router.pathname;
  return (
    <>
      <NextSeo
        title="Propose"
        description="KERNEL Conversations is a home for conversations taking place in the Kernel network. Propose a new Conversation in KERNEL network."
        openGraph={{
          url,
          title: 'Convo | Propose',
          description: 'Propose a new Conversation in KERNEL network',
          images: [
            {
              url: 'https://confab-frontend.vercel.app/images/banner.jpg',
              alt: 'KERNEL squares and circles',
              type: 'image/jpeg',
            },
          ],
          site_name: 'A KERNEL Junto',
        }}
      />
      <Main>
        <div className="flex flex-col">
          <div className="
            font-inter mx-auto font-bold sm:text-3xl text-xl
            text-primary mt-10 mb-10
          ">
            Propose a Junto
          </div>
          <div className="border border-primary-muted my-4 mx-20 border-opacity-50">
          </div>
        </div>
        <div>
          <ProposeForm
            className="py-12 xl:px-24 px-10"
            eventType={1}
          />
        </div>
      </Main>
    </>
  );
};
export default Propose;
