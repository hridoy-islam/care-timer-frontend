import "./globals.css";

import React, { lazy } from "react";
// import Loading from '../components/loading/Loading';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
// const token = useContext
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
import { Roboto } from "next/font/google";
import MainContext from "../context/MainContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Care Timer",
  description: "care time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body suppressHydrationWarning={true}>
        <React.Fragment>
          <MainContext>
            <body>
              {children} <ToastContainer autoClose={1000} />
            </body>
          </MainContext>
        </React.Fragment>
      </body>
    </html>
  );
}
