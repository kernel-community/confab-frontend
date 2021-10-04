// import Navbar from '../components/composed/Navbar';
import Footer from '../components/composed/Footer';
import Head from 'next/head';

const Main = ({children}: {children: any}) => {
  return (
    <>
      <Head>
        <title>KERNEL Conversations</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,300;0,400;0,500;0,700;0,800;1,300;1,400;1,500;1,700;1,800&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col h-screen">
        {/* <Navbar /> */}
        <div className="flex-1 bg-skin flex flex-col justify-center lg:px-20 lg:py-12">
          <div className="
            bg-skin-muted
            rounded-lg shadow-lg
            lg:mx-44
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
