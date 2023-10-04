
import './globals.css';

import React, { lazy } from 'react';
// import Loading from '../components/loading/Loading';
import MenuContextProvider from '../context/MenuContext';
// const MenuContextProvider = lazy(() => import('../context/MenuContext'));
import { Roboto } from 'next/font/google'
const roboto  = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: 'Care Timer',
  description: 'care time',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={roboto.className}>
      <body>
        <React.Fragment>
          <MenuContextProvider>
        
            <body>{children}</body>
          </MenuContextProvider>
        </React.Fragment>
      </body>
    </html>
  );
}
