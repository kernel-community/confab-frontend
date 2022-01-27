import type {NextPage} from 'next';
import Main from '../layouts/Main';
import {Events} from '../components/composed/Events';

const Home: NextPage = () => {
  return (
    <Main>
      <Events
        type='live'
      />
      <Events
        type='upcoming'
      />
      <Events
        type='past'
      />
    </Main>
  );
};
export default Home;
