import {Item} from 'components/composed/Navbar/Item';
import {Branding} from './Branding';

export const Navbar = () => {
  return (
    <>
      <div className={`
        w-full flex flex-row gap-8 justify-center items-center bg-kernel
        font-secondary text-sm text-gray-300
        px-3
        shadow-dark
        z-10
      `}>
        <Branding />
        <div className="flex-grow flex flex-row gap-8 items-center justify-center">
          <Item text='home' href='/'/>
          <Item text='all' href='/all'/>
          <Item text='archive' href='/archive'/>
          <Item text='about' href='/about'/>
        </div>
        <Item text='propose' href='/propose'/>
      </div>
    </>
  );
};
