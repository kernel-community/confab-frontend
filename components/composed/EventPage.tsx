import Hero from '../rsvp/Hero';
import Description from '../rsvp/Description';
import RsvpSection from '../rsvp/RsvpSection';
import {useState, useEffect} from 'react';
import Spinner from './Spinner';
import {ClientEvent} from '../../types';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';

const EventPage = ({
  event,
}: {
  event?: string | string[] | undefined
}) => {
  const router = useRouter();
  const url = router.asPath;
  const [loading, setLoading] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<ClientEvent>({
    title: '',
    description: '',
    proposerName: '',
    sessionCount: 0,
    sessions: [],
  });
  useEffect(() => {
    setLoading(true);
    (async () => {
      const r = (await (await fetch('/api/getEvent', {
        body: JSON.stringify({event}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
      setEventDetails(r);
    })();
    if (eventDetails.title) setLoading(false);
  }, [event]);
  useEffect(() => {
    if (eventDetails.title) setLoading(false);
  }, [eventDetails]);
  return (
    (!loading && <>
      <NextSeo
        title={eventDetails.title}
        openGraph={{
          url: `https://convo.kernel.community${url}`,
          title: `${eventDetails.title}`,
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
      {loading ? <div className="p-32"><Spinner /></div> : (
      <>
        <Hero
          title={eventDetails.title}
          type={eventDetails.type!}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <Description
            description={eventDetails.description}
          />
          {eventDetails.sessions ? (<RsvpSection
            proposerName={eventDetails.proposerName!}
            sessionsCount={eventDetails.sessionCount!}
            sessions={eventDetails.sessions!}
          />) : <></>}
        </div>
      </>
      )}
    </>)
  );
};

export default EventPage;
