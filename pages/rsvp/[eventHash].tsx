import {useRouter} from 'next/router';
import Main from '../../layouts/Main';
import EventPage from '../../components/composed/EventPage';

const Post = () => {
  const router = useRouter();

  const {
    eventHash,
  } = router.query;
  return (
    <Main>
      <EventPage
        event={eventHash}
      />
    </Main>
  );
};

export default Post;
