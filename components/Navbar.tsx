import Image from 'next/image';
import proposeIcon from '../public/vectors/propose.png';
import homeIcon from '../public/vectors/home.png';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Navbar = () => {
  const router = useRouter();
  return (
    <div className={`
    w-full flex flex-row gap-3 justify-center items-center
    bg-primary-light py-5
    font-inter text-sm font-semibold text-primary
    `}>
      <Link href="/">
        <div className={`
        flex flex-row items-center gap-1
        cursor-pointer
        ${router.pathname == '/' ? '' : 'opacity-50'}
        `}>
          <Image
            src={homeIcon}
          />
          Home
        </div>
      </Link>
      <Link href="/propose">
        <div className={`
        flex flex-row items-center gap-1
        cursor-pointer
        ${router.pathname == '/propose' ? '' : 'opacity-50'}
        `}>
          <Image
            src={proposeIcon}
          />
          Propose
        </div>
      </Link>

    </div>
  );
};

export default Navbar;
