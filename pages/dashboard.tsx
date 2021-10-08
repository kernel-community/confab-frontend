import Main from '../layouts/Main';
import {NextPage} from 'next';
import useAuth from '../hooks/useAuth';
import {useRouter} from 'next/router';
import {NextSeo} from 'next-seo';
import Image from 'next/image';
import pencilVector from '../public/vectors/pencil.png';
import checkmarkVector from '../public/vectors/checkmark.png';
import {useState} from 'react';

const Dashboard: NextPage = () => {
  const {user, loading} = useAuth({redirectTo: '/login'});
  const router = useRouter();
  const logoutRequest = async () => {
    await fetch('/api/logout', {method: 'POST'});
    router.push('/login');
  };
  const [editNameMode, setEditNameMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const updateUserName = async () => {
    if (username.length > 0) {
      await fetch('/api/updateUser', {
        method: 'POST',
        body: JSON.stringify({email: user?.email, name: username}),
        headers: {
          'Content-type': 'application/json',
        },
      });
    }
  };
  const handleNameChange = (e: any) => {
    if (e.target.value.length > 0) {
      setUsername(e.target.value);
    }
  };
  return (
    <>
      <NextSeo
        title="Dashboard"
      />
      <Main>
        <div className="flex flex-row mt-20 mb-10 justify-center items-center w-full">
          <div className="flex flex-col">
            {loading ? 'Loading...' : (
              <>
                <div className=" flex flex-row items-center gap-2">
                  {!editNameMode ? (
                  <span className="font-inter font-bold sm:text-3xl text-xl text-primary flex-grow">
                    {username || user?.name}
                  </span>
                  ): (
                    <span>
                      <input
                        type="text"
                        className="
                        border-l-0 border-t-0 border-b-2 border-r-0 border-primary
                        focus:ring-0 focus:bg-gray-200
                        rounded-t-md
                        text-xl text-primary font-inter font-bold
                        "
                        placeholder={user?.name}
                        onChange={handleNameChange}
                      />
                    </span>
                  )}
                  {!editNameMode? (
                  <div
                    className="self-end cursor-pointer"
                    onClick={() => setEditNameMode(!editNameMode)}
                  >
                    <Image
                      width="25px"
                      height="25px"
                      src={pencilVector}
                    />
                  </div>
                  ): (
                    <div
                      className="self-end cursor-pointer"
                      onClick={() => {
                        updateUserName();
                        setEditNameMode(!editNameMode);
                      }}
                    >
                      <Image
                        width="15px"
                        height="15px"
                        src={checkmarkVector}
                      />
                    </div>
                  )}
                </div>
                <div className="
                  font-inter text-primary font-semibold
                "
                >
                  {user?.email}
                </div>
              </>
            )}
            <span>
              <span
                className="
                  font-light
                  underline
                  text-primary
                  cursor-pointer
                  text-sm
                  "
                onClick={logoutRequest}
              >
                Logout
              </span>
            </span>
          </div>
        </div>
      </Main>
    </>
  );
};

export default Dashboard;
