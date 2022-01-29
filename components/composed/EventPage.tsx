import Hero from 'components/rsvp/Hero';
import {Article} from 'components/atomic/Article';
import RsvpSection from 'components/rsvp/RsvpSection';
import {ClientEvent} from 'types';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';

const EventPage = ({
  event,
}: {
  event: ClientEvent
}) => {
  const router = useRouter();
  const url = router.asPath;

  return (
    <>
      <NextSeo
        title={event.title}
        openGraph={{
          url: `https://convo.kernel.community${url}`,
          title: `${event.title}`,
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
      <Hero
        title={event.title}
        type={event.type}
        proposer={event.proposerName}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-24 gap-12">
        <div className='col-span-2'>
          <Article
            html={event.description}
          />
          <div className='font-fancy text-5xl text-kernel-purple pt-24'>
            {event.proposerName}
          </div>
        </div>
        <div>
          {event.sessions &&
              <RsvpSection
                sessions={event.sessions!}
              />
          }
        </div>
      </div>
    </>
  );
};

export default EventPage;
