'use client';

import { useState, useEffect, Fragment, useContext } from "react";
import SideBar from "../../components/layout/company-layout/CompanySidebar";
import TopBar from "../../components/layout/company-layout/MainHeader";
import { Transition } from "@headlessui/react";
import { userContext } from "../../context/MainContext";
import Login from "../login/page";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  const { setTokenDetails, tokenDetails } = useContext(userContext);
  const role = tokenDetails?.data?.role;
  useEffect(() => {
    import('preline')
  }, [])
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <TopBar showNav={showNav} setShowNav={setShowNav} />
  <Transition
    as={Fragment}
    show={showNav}
    enter="transform transition duration-[400ms]"
    enterFrom="-translate-x-full"
    enterTo="translate-x-0"
    leave="transform duration-[400ms] transition ease-in-out"
    leaveFrom="translate-x-0"
    leaveTo="-translate-x-full"
  >
    <SideBar showNav={showNav} />
  </Transition>
  <main
    className={`py-24 transition-all duration-[400ms] w-full ${
      showNav && !isMobile ? "pl-60 w-full" : ""
    }`}
  >
    <div className="px-4 md:px-16  ">{children}</div>
  </main>
    </>
      
    
  );
}
