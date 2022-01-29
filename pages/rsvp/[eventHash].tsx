import {useRouter} from 'next/router';
import Main from 'layouts/Main';
import EventPage from 'components/composed/EventPage';
import {useState, useEffect} from 'react';
import {ClientEvent} from 'types';
import Spinner from 'components/composed/Spinner';

const Post = () => {
  const router = useRouter();

  const {
    eventHash,
  } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<ClientEvent>({
    title: '',
    description: '',
    proposerName: '',
    sessionCount: 0,
    sessions: [],
  });
  useEffect(() => {
    // @todo: need error state here
    setLoading(true);
    (async () => {
      const r = (await (await fetch('/api/getEvent', {
        body: JSON.stringify({event: eventHash}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
      setEventDetails(r);
    })();
    setLoading(false);
  }, [eventHash]);
  return (
    <Main>
      {loading?
      <div className="p-32"><Spinner /></div> :
      <EventPage
        event={eventDetails}
      />}
    </Main>
  );
};

export default Post;
