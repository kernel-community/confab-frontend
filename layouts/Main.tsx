import Navbar from '../components/composed/Navbar';
import Footer from '../components/composed/Footer';

const Main = ({children}: {children: any}) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-skin flex flex-col justify-center lg:px-20 lg:py-12">
          {/* <div className="
            bg-skin-muted
            rounded-lg shadow-lg
            lg:mx-56
          "> */}
          {children}
          {/* </div> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
