import type {NextPage} from 'next';
import Main from '../layouts/Main';
import ProposeForm from '../components/composed/ProposeForm';

const Propose: NextPage = () => {
  return (
    <Main>
      <div className="flex flex-col">
        <div className="
            font-inter mx-auto font-bold sm:text-3xl text-xl
            text-primary mt-10 mb-10
          ">
            Propose a Conversation
        </div>
        <div className="border border-primary-muted my-4 mx-20 border-opacity-50">
        </div>
      </div>
      <div>
        <ProposeForm
          className="py-12 lg:px-24 px-10"
        />
      </div>
    </Main>
  );
};
export default Propose;
