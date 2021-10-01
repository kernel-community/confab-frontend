import type {NextPage} from 'next';
import Main from '../layouts/Main';
import BigFatBanner from '../components/composed/BigFatBanner';

const Test: NextPage = () => {
  return (
    <Main>
      <BigFatBanner
        text={`Whatcha lookin for? 👀`}
        helperText={`ping @kernel-setwards on #kernel-reception if you're lost`}
      />
    </Main>
  );
};
export default Test;
