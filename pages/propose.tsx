import type {NextPage} from 'next';
import Main from '../layouts/Main';
import ProposeForm from '../components/ProposeForm';

const Propose: NextPage = () => {
  return (
    <Main>
      <div className="
        bg-skin-muted my-10 mx-24 lg:mx-64
        rounded-lg shadow-sm
      ">
        <div className="flex flex-col">
          <div className="
            font-inter mx-auto font-bold text-3xl
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
      </div>
    </Main>
  );
};
export default Propose;
