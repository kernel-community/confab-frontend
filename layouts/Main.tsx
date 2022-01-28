import {Navbar} from 'components/composed/Navbar';
import Footer from '../components/composed/Footer';

const Main = ({children}: {children: any}) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container mx-auto sm:px-20 sm:my-24 px-5 my-12">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
