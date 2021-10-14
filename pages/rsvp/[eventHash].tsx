import {useRouter} from 'next/router';
import Main from '../../layouts/Main';
import EventPage from '../../components/composed/EventPage';
import useAuth from '../../hooks/useAuth';

const Post = () => {
  const router = useRouter();
  const {user} = useAuth({});

  const {
    eventHash,
  } = router.query;
  return (
    <Main>
      <EventPage
        event={eventHash}
        userEmail={user?.email || ''}
      />
    </Main>
  );
};

export default Post;
