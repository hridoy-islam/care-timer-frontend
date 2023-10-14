"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { userContext } from "../../../context/MainContext";
// const actions = [
//    { id: 1, label: "Profile", route: "/user/profile" },
//    { id: 2, label: "Settings", route: "/user/createProfile" }
// ];

const UserAreaSelectBox = () => {
   const [open, setOpen] = useState(false);
  const { tokenDetails} = useContext(userContext);

   return (
      <>
         <div className="flex flex-col justify-center items-center relative z-10">
            <div onClick={() => setOpen((prev) => !prev)} className="p-4 cursor-pointer">
               {/* <FaUserCircle className="h-8 w-8 text-[#11212E]"/> */}
               {/* <img class="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description"/> */}
               <span className="border-2 border-primary p-2 rounded-lg">{tokenDetails?.data?.name}</span>
            </div>
            <div
               className={`flex flex-col bg-secondary text-white  w-[240px] my-2 rounded-lg ${
                  open ? "pt-4 pb-4 h-auto" : "overflow-hidden h-0"
               } transition-all duration-200 overflow-hidden absolute top-12 right-0`}
            ><h3 className="pl-4">Signed in as</h3>
            <h3 className="py-2  pl-4">{tokenDetails?.data?.email}</h3>
               {/* {actions.map((item) => (
                  <div
                     key={item.id}
                     onClick={() => {
                        setOpen(false);
                     }}
                     className={`flex justify-start items-center my-2 pl-4 hover:bg-primary cursor-pointer `}
                  >
                     <Link href={item.route}>{item.label}</Link>
                  </div>
               ))} */}
            </div>
         </div>
         <div
            onClick={() => setOpen(false)}
            className={`bg-gray-100 fixed inset-0 opacity-0 z-0 ${open ? "block" : "hidden"}`}
         ></div>
      </>
   );
};

export default UserAreaSelectBox;
