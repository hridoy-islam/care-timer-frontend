"use client";

import { useState, useEffect, Fragment } from "react";
import SideBar from "../../components/layout/admin-layout/AdminSidebar";
import TopBar from "../../components/layout/admin-layout/MainHeader";
import { Transition } from "@headlessui/react";

export default function Layout({ children }) {
  useEffect(() => {
    import("preline");
  }, []);
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
      {/* <div className='w-1/5 h-screen fixed bg-secondary px-4 shadow-xl shadow-secondary'><SideBar /></div>
      <div className='w-4/5 ml-auto'>
        <div className='w-full'><TopBar /></div>
        <main className='mx-2 mb-12 mt-24'>{children}</main>
      </div> */}
      <main
        className={`py-24 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}
