import Image from 'next/image';
import proposeIcon from '../../public/vectors/propose.png';
import homeIcon from '../../public/vectors/home.png';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Navbar = () => {
  const router = useRouter();
  return (
    <div className={`
    w-full flex flex-row gap-8 justify-center items-center
    sm:bg-skin-muted bg-primary-light
    font-inter text-sm font-semibold text-primary
    `}>
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
  );
};

export default Navbar;
