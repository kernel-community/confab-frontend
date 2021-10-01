import type {NextPage} from 'next';
import Main from '../layouts/Main';
import BigFatBanner from '../components/composed/BigFatBanner';

const Test: NextPage = () => {
  return (
    <Main>
      <BigFatBanner
        text="Coming Soon!"
      />
    </Main>
  );
};
export default Test;
