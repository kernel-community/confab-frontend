import {useRouter} from 'next/router';
import Main from 'layouts/Main';
import EventPage from 'components/composed/EventPage';
import {useQuery} from 'react-query';

const Post = () => {
  const {query} = useRouter();
  const {
    eventHash,
  } = query;
  // eslint-disable-next-line no-unused-vars
  const {isLoading, isError, data, isFetching} = useQuery(
      `rsvp_${eventHash}`,
      async () => {
        const r = (await (await fetch('/api/getEvent', {
          body: JSON.stringify({event: eventHash}),
          method: 'POST',
          headers: {'Content-type': 'application/json'},
        })).json()).data;
        return r;
      },
      {
        refetchInterval: 60000, // refetch every 30 seconds
      },
  );
  return (
    <Main className='
      container
      mx-auto
    '>
      {/* @todo */}
      {/* {isLoading && <div>Loading</div>} */}
      {/* {isFetching && <div>Fetching data</div>} */}
      {isError && <div>There was an error</div>}
      {
        !isLoading &&
        !isError &&
        data &&

        <EventPage
          event={data}
        />

      }

    </Main>
  );
};

export default Post;
