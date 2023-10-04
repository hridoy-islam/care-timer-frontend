"use client";
import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import UserAreaSelectBox from "./UserAreaSelectBox";
import { BiLogInCircle } from "react-icons/bi";

export default function MainHeader({ showNav, setShowNav }) {
  return (
    <div
      className={`fixed w-full z-70 h-16 flex bg-gray-50 shadow-lg mb-6 justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
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
               <Link className="text-xl px-2" href='/login'>
                  <BiLogInCircle/>
               </Link>
            </div>
         </div>
         </div>
      </div>
    </div>
  );
}

