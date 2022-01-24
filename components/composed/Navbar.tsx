import Image from 'next/image';
import proposeIcon from '../../public/vectors/propose.png';
// import personIcon from '../../public/vectors/person.png';
import homeIcon from '../../public/vectors/home.png';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <div className={`
    w-full flex flex-row gap-8 justify-center items-center
    lg:bg-skin-muted bg-primary-light
    font-inter text-sm font-semibold text-primary
    `}>
        <div className={`
        flex flex-row items-center gap-1 py-5
        cursor-pointer p-3
        opacity-20
        `}>
          Convo
        </div>
        <div className="flex-grow flex flex-row gap-8 items-center justify-center">
          <Link href="/">
            <div className={`
        flex flex-row items-center gap-1 py-5
        cursor-pointer
        ${router.pathname == '/' ? 'border-b-2 border-primary' : 'opacity-50'}
        `}>
              <Image
                src={homeIcon}
              />
          Home
            </div>
          </Link>
          <Link href="/propose">
            <div className={`
        flex flex-row items-center gap-1 py-5
        cursor-pointer
        ${router.pathname == '/propose' ? 'border-b-2 border-primary' : 'opacity-50'}
        `}>
              <Image
                src={proposeIcon}
              />
          Propose
            </div>
          </Link>
        </div>
        {/* {user ? (
          <Link href="/dashboard">
            <div className={`
            flex flex-row items-center gap-1 py-5
            cursor-pointer p-3
            ${router.pathname == '/dashboard' ? 'opacity-100' : 'opacity-50'}
          `}>
              <Image src={personIcon}/>
            </div>
          </Link>
        ): (
        <Link href="/login">
          <div className={`
            flex flex-row items-center gap-1 py-5
            cursor-pointer p-3
            ${router.pathname == '/login' ? 'border-b-2 border-primary' : 'opacity-50'}
          `}>
            Login
          </div>
        </Link>
        )} */}

      </div>

    </>
  );
};

export default Navbar;
