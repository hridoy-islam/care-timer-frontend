"use client";
import { Fragment, useContext } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import UserAreaSelectBox from "./UserAreaSelectBox";
import { BiLogInCircle } from "react-icons/bi";
import { userContext } from '../../../context/MainContext';

export default function MainHeader({ showNav, setShowNav }) {
  const { tokenDetails, setTokenDetails, setToken} = useContext(userContext);
  console.log(tokenDetails)
  const logOut = () => {
        
    localStorage.removeItem('details');
    localStorage.removeItem('timertoken');
    setTokenDetails('')
    setToken('')
    
    
}
  return (
    <div
      className={`fixed w-full h-16 flex bg-gray-50 shadow-lg mb-6 justify-between items-center transition-all duration-[400ms] z-10  ${showNav ? "pl-56" : ""
        }`}
    >
      <div className="pl-4 md:pl-16 ml-12">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <div className="flex items-center">
          <UserAreaSelectBox />
          <div>
            <div class="border-l border-secondary pl-3 ml-3 space-x-1 flex justify-between items-center">
              {/* {user ? (
                <>
                  <p className="text-sky-600"> {session.user.email}</p>
                  <Link href='/auth/login'>
                  <button className="text-xl px-2 " onClick={() => signOut()}>
                  <BiLogInCircle />
                  </button></Link>
                </>
              ) : (
                ""
              )} */}
              
              <Link className="text-xl px-2" href='/'>
              <button className='log-out ' onClick={logOut}><BiLogInCircle /></button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

