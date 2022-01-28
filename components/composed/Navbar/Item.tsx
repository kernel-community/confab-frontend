import {useRouter} from 'next/router';
import Link from 'next/link';
export const Item = ({
  text, href,
}: {text: string, href: string}) => {
  const {pathname} = useRouter();
  return (
    <Link href={href}>
      <div className={`
        flex flex-row items-center gap-1 py-5
        cursor-pointer
        lowercase
        ${pathname == href ? 'border-b-2 border-gray-300' : 'opacity-50'}
        `}>
        {text}
      </div>
    </Link>
  );
};
