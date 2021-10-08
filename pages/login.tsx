import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Plane from '../layouts/Plane';
import {Magic} from 'magic-sdk';
import useAuth from '../hooks/useAuth';
import {useState} from 'react';
import Spinner from '../components/composed/Spinner';
import {NextSeo} from 'next-seo';

const Login: NextPage = () => {
  const router = useRouter();
  useAuth({redirectTo: '/dashboard', redirectIfFound: true});
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const {elements} = event.target;
    const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || '')
        .auth
        .loginWithMagicLink({email: elements.email.value});
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: {Authorization: `Bearer ${did}`},
    });
    if (authRequest.ok) {
      setLoading(false);
      router.push('/dashboard');
    } else {/* handle errors */}
  };
  return (
    <>
      <NextSeo
        title="Login"
      />
      <Plane>
        <div className="mx-auto">
          <div className="flex flex-col gap-4">
            <div className="
            text-primary
            font-semibold
            font-inter
            mb-12
            text-lg
          ">
            KERNEL Conversations
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="email"
                type="email"
                className={`
                border-0
                focus:ring-0
                rounded-sm
                text-sm
                py-3
                text-primary
                ${loading ? 'cursor-not-allowed' : ''}
              `}
                placeholder="email"
                disabled={loading}
              />
              {!loading ? (
            <button
              className={`
                bg-primary
                font-inter
                text-primary-lighter
                py-2
                font-medium
                rounded-sm
                ${loading ? 'cursor-not-allowed' : ''} 
              `}
              disabled={loading}
            >
                Log in
            </button>
            ):(
              <Spinner/>
            )}
            </form>
          </div>
        </div>
      </Plane>
    </>
  );
};
export default Login;
