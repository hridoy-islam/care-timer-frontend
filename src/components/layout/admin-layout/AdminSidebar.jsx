import { forwardRef } from "react";
import Link from "next/link";
// import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { AiFillHome, AiOutlineClose, AiFillSchedule } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { BiSolidArchiveIn, BiChevronDown } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineTable } from "react-icons/ai";
import { usePathname } from 'next/navigation'

const AdminSidebar = forwardRef(({ showNav }, ref) => {
  const pathname = usePathname()
  return (
    <div ref={ref} className="fixed z-50 w-72 h-full bg-gray-50 shadow-2xl px-3 transition-all duration-200">

      <div className="text-2xl text-secondary font-serif font-extrabold pl-6 pt-6">
            Care Timer
         </div>
         <ul className='hs-accordion-group'>
        <li className={`flex justify-start items-center text-lg  mt-12 text-secondary  rounded-lg px-2 py-2 ${
              pathname == "/admin"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
          <AiFillHome className='mr-2' />
          <Link href='/admin' >
            Dashboard
          </Link>
        </li>
        <li>
        </li>
        <li className="hs-accordion " id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 pt-4 px-2 hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="#">
            <FaBuildingUser />
            Company

            <svg className="hs-accordion-active:block ml-4 hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden ml-4 block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pt-2 pl-2">
              <li>
                <Link href="/admin/company/addCompany" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/admin/company/addCompany"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                <span className='flex items-center '>
                    <AiOutlinePlus/><span className='pl-2'>Add Company</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin/company/allCompany" className={`block text-lg pl-4 font-base  py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/admin/company/allCompany"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                <span className='flex items-center '>
                    <AiOutlineTable/><span className='pl-2'>All Company</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin/company/archiveCompany" className={`block text-lg pl-4 font-base  py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/admin/company/archiveCompany"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                <span className='flex items-center '>
                    <BiSolidArchiveIn/><span className='pl-2'>Archive Company</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        {/* <li className="hs-accordion" id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 pt-6 px-2 hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="#">
            <FaUsers />
            Team Member

            <svg className="hs-accordion-active:block ml-8 hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden ml-8 block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pt-2 pl-2">
              <li>
                <Link href="/teamMember/addTeamMember" className="block text-lg pl-4 font-base pt-4 pb-2 ml-3 text-secondary">
                <span className='flex items-center '>
                    <AiOutlinePlus/><span className='pl-2'>Add Team Member</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/teamMember/allTeamMember" className="block text-lg pl-4 font-base  py-2 ml-3 text-secondary">
                <span className='flex items-center '>
                    <AiOutlineTable/><span className='pl-2'>All Team Member</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="hs-accordion " id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 pt-6 px-2 hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="#">
            <FaUser />
            Service User

            <svg className="hs-accordion-active:block ml-4 hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden ml-4 block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pt-2 pl-2">
              <li>
                <Link href="/serviceUser/addServiceUser" className="block text-lg pl-4 font-base pt-4 pb-2 ml-3 text-secondary">
                <span className='flex items-center '>
                    <AiOutlinePlus/><span className='pl-2'>Add Service User</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/serviceUser/allServiceUser" className="block text-lg pl-4 font-base  py-2 ml-3 text-secondary">
                <span className='flex items-center '>
                    <AiOutlineTable/><span className='pl-2'>All Service User</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="hs-accordion" id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 pt-6 px-2 hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="#">
            <VscTasklist/>
            Tasklist

            <svg className="hs-accordion-active:block ml-8 hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden ml-8 block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pt-2 pl-2">
              <li>
                <Link href="/tasklist/addTasklist" className="block text-lg pl-4 font-base pt-4 pb-2 ml-3 text-secondary ">
                  <span className='flex items-center '>
                    <AiOutlinePlus/><span className='pl-2'>Add Tasklist</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/tasklist/allTasklist" className="block text-lg pl-4 font-base  py-2 ml-3 text-secondary">
                <span className='flex items-center '>
                    <AiOutlineTable/><span className='pl-2'>All Tasklist</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className='flex justify-start items-center text-lg mt-6 text-secondary   rounded-xl px-2'>
          <MdReport className='mr-2 ' />
          <Link href='/report/allReport' >
            Report
          </Link>
        </li>
        <li className='flex justify-start items-center text-lg mt-6 text-secondary   rounded-xl px-2'>
          <AiFillSchedule className='mr-2  ' />
          <Link href='/schedule/addSchedule' >
          Schedule
          </Link>
        </li>

        <li className='flex justify-start items-center text-lg mt-6 text-secondary   rounded-xl px-2'>
          <BiSolidPhoneCall className='mr-2' />
          <Link href='/callSummery' >
            Call Summery
          </Link>
        </li> */}
      </ul>
    </div>
  );
});

AdminSidebar.displayName = "SideBar";

export default AdminSidebar;
