import {useRouter} from 'next/router';
import Main from '../../layouts/Main';
import EventPage from '../../components/EventPage';
import RsvpSubmission from '../../components/RsvpSubmission';

const Post = () => {
  const router = useRouter();
  const {
    eventHash,
    submitted,
  } = router.query;
  return (
    <Main>
      {submitted ?
        <RsvpSubmission
          flag={submitted}
        /> :
         <EventPage
           event={eventHash}
         />
      }
    </Main>
  );
};

export default Post;
