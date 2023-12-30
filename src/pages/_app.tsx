import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { Roboto } from 'next/font/google';

import "~/styles/globals.css";

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-sans',
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${roboto.variable} font-sans bg-gray-100`}>
      <nav className="flex p-4 justify-between items-center absolute w-full text-white font-bold z-10">
        <Link href="/">
          Logo
        </Link>
      </nav>
      <Component {...pageProps} />
      <footer className="p-8 bg-gray-900">
      </footer>
    </div>
  )
};

export default MyApp;

