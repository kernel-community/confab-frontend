import {Navbar} from 'components/composed/Navbar';
import {useRouter} from 'next/router';
import Footer from '../components/composed/Footer';
import Image from 'next/image';
import linesVector from 'public/images/lines.png';

const linesBgOn=['/'];

const Main = ({children, className}: {children: any, className?:string}) => {
  const {pathname} = useRouter();
  const displayLines = linesBgOn.find((path) => {
    if (path === '/') return pathname === path;
    return pathname.includes(path);
  });

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden selection:bg-highlight selection:text-primary">
      <Navbar />
      <div className={`
          flex-1
          sm:my-24
          my-12
          ${className}
      `}>
        {children}
      </div>
      <Footer />
      {displayLines &&
      <>
        <div className='
        hidden
        lg:block
        lg:absolute
        lg:-top-24
        lg:-left-52
        lg:z-0
        '
        >
          <Image src={linesVector} width={383} height={412}/>
        </div>
        <div className='
        hidden
        lg:block
        lg:absolute
        lg:-top-12
        lg:-right-52
        lg:z-0
        '>
          <Image src={linesVector} width={442} height={476}/>
        </div>
      </>
      }
    </div>
  );
};

export default Main;
