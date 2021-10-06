import Main from '../layouts/Main';
import {NextSeo} from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import copyVector from '../public/vectors/copy.png';
import {useRouter} from 'next/router';

const Submission = () => {
  const router = useRouter();
  const {eventHash, ok, type} = router.query;
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('yoyoyoyo');
    alert('event link copied to clipboard');
  };
  return (
    <>
      <NextSeo title={ok == 'true' ? `Submission` : `Error in Submission`}
      />
      <Main>
        <div className="flex flex-col py-12">
          <div className={`
            mx-auto
            font-bold sm:text-3xl text-xl font-inter
            ${ok == 'true' ? 'text-primary' : 'text-red-400'}
            mt-10 mb-10
          `}>
            {
              ok == 'true'? type + ' Submitted Successfully' : ' Error in Submission'
            }
          </div>
          <div className="border border-primary-muted my-4 mx-20 border-opacity-50">
          </div>
          <div className="mx-auto">
            {
              ok == 'true' ? (
                <div className="flex flex-col gap-3 items-center">
                  <button className="
                  text-lg font-inter
                  bg-transparent
                  border-2
                  border-gray-400
                  text-primary
                  py-2 px-5 rounded-lg
                  cursor-pointer
                  hover:bg-white hover:border-primary
                  hover:shadow-lg
                  flex flex-row gap-3 items-center
                  font-medium
                "
                  onClick={copyToClipboard}
                  >
                    convo.kernel.community/rsvp/{eventHash}
                    <Image
                      src={copyVector}
                      width='15px'
                      height='15px'
                    />
                  </button>
                  <Link href={`/rsvp/${eventHash}`}>
                    <div
                      className="
                      font-inter
                      font-medium
                      text-primary
                      text-sm
                      cursor-pointer
                      "
                    >
                    Open RSVP page ↗
                    </div>
                  </Link>
                </div>
              ) : (
                <div>
                  Please try again or ping @kernel-stewards on #kernel-reception
                </div>
              )
            }
          </div>
        </div>
      </Main>
    </>
  );
};

export default Submission;
