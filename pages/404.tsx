import type {NextPage} from 'next';
import Main from '../layouts/Main';
import BigFatBanner from '../components/composed/BigFatBanner';
import {NextSeo} from 'next-seo';

const Test: NextPage = () => {
  return (
    <>
      <NextSeo title='404 Not Found'
      />
      <Main>
        <BigFatBanner
          text={`Whatcha lookin for? 👀`}
          helperText={`ping @kernel-setwards on #kernel-reception if you're lost`}
        />
      </Main>
    </>
  );
};
export default Test;
