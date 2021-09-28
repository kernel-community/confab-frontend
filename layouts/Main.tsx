import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const Main = ({children}: {children: any}) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,300;0,400;0,500;0,700;0,800;1,300;1,400;1,500;1,700;1,800&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 bg-skin">
          <div className="
            bg-skin-muted my-10 mx-24 lg:mx-64
            rounded-lg shadow-lg
          ">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
