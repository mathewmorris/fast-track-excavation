import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { Roboto } from 'next/font/google';

import "~/styles/globals.css";
import excavatorImage from '../../public/excavator.png';
import Image from "next/image";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

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
          <div className="flex items-start">
            <Image src={excavatorImage} alt="excavator" height={32} />
            <div className="flex flex-col pl-2">
              <p className="font-light leading-3 text-xl">FAST TRACK</p>
              <p className="font-bold leading-6 text-xl">EXCAVATION</p>
            </div>
          </div>
        </Link>
        <div className="text-right sm:hidden">
          <a className="flex justify-between gap-2 p-2 bg-white/10 rounded-full mb-2" href="tel:405-664-6362">Call Us<PhoneIcon className="h-6"/></a>
          <a className="flex justify-end gap-2 p-2 bg-white/10 rounded-full" href="mailto:fasttrackexcavation@gmail.com">Email Us<EnvelopeIcon className="h-6"/></a>
        </div>
        <div className="text-right hidden sm:block">
          <p>Call us at <a className="hover:text-red-500" href="tel:405-664-6362">405-664-6362</a></p>
          <p>Email us at <a className="hover:text-red-500" href="mailto:fasttrackexcavation@gmail.com">fasttrackexcavation@gmail.com</a></p>
        </div>
      </nav>
      <Component {...pageProps} />
      <footer className="p-8 bg-gray-900">
      </footer>
    </div>
  )
};

export default MyApp;

