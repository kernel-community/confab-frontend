import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Head from 'next/head';

const Main = ({children}: {children: any}) => {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 bg-skin">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
