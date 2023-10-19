import { forwardRef } from "react";
import Link from "next/link";
// import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { AiFillHome, AiOutlineClose, AiFillSchedule } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { BiSolidPhoneCall, BiSolidArchiveIn } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineTable } from "react-icons/ai";
import { MdPayments, MdReport } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
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
              pathname == "/company"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
          <AiFillHome className='mr-2' />
          <Link href='/company' >
            Dashboard
          </Link>
        </li>
        <li className="hs-accordion" id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 px-2 py-2 my-2 hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="javascript:;">
            <FaUsers />
            Team Member

            <svg className="hs-accordion-active:block  hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden  block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className=" pl-2">
              <li>
                <Link href="/company/teamMember/addTeamMember" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/teamMember/addTeamMember"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlinePlus /><span className='pl-2'>Add Team Member</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/company/teamMember/allTeamMember" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/teamMember/allTeamMember"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlineTable /><span className='pl-2'>All Team Member</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/company/teamMember/archiveTeamMember" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/teamMember/archiveTeamMember"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <BiSolidArchiveIn /><span className='pl-2'>Archive Team Member</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="hs-accordion " id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 px-2 py-2 my-2  hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="javascript:;">
            <FaUser />
            Service User

            <svg className="hs-accordion-active:block hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className="pl-2">
              <li>
                <Link href="/company/serviceUser/addServiceUser" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/serviceUser/addServiceUser"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlinePlus /><span className='pl-2'>Add Service User</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/company/serviceUser/allServiceUser" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/serviceUser/allServiceUser"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlineTable /><span className='pl-2'>All Service User</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/company/serviceUser/archiveServiceUser" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/serviceUser/archiveServiceUser"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <BiSolidArchiveIn /><span className='pl-2'>Archive Service User</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="hs-accordion" id="account-accordion">
          <Link className="hs-accordion-toggle flex items-center gap-x-2 px-2 py-2 my-2  hs-accordion-active:text-secondary hs-accordion-active:hover:bg-transparent text-lg text-secondary rounded-md  hover:text-secondary" href="javascript:;">
            <VscTasklist />
            Tasklist

            <svg className="hs-accordion-active:block hidden w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>

            <svg className="hs-accordion-active:hidden block w-3 h-3 text-secondary " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </Link>

          <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
            <ul className=" pl-2">
              <li>
                <Link href="/company/tasklist/addTasklist" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/tasklist/addTasklist"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlinePlus /><span className='pl-2'>Add Tasklist</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/company/tasklist/allTasklist" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/tasklist/allTasklist"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlineTable /><span className='pl-2'>All Tasklist</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/company/tasklist/archiveTasklist" className={`block text-lg pl-4 font-base py-2 ml-3 rounded-lg my-2 text-secondary ${
              pathname == "/company/tasklist/archiveTasklist"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
                  <span className='flex items-center '>
                    <AiOutlineTable /><span className='pl-2'>Archive Tasklist</span>
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </li>
        <li className={`flex justify-start items-center text-lg text-secondary  rounded-lg px-2 py-2 my-2  ${
              pathname == "/company/report"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
          <MdReport className='mr-2 ' />
          <Link href='/company/report' >
            Report
          </Link>
        </li>
        <li className={`flex justify-start items-center text-lg text-secondary  rounded-lg px-2 py-2 my-2 ${
              pathname == "/company/schedule/addSchedule"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
          <AiFillSchedule className='mr-2  ' />
          <Link href='/company/schedule/addSchedule' >
            Schedule
          </Link>
        </li>

        <li className={`flex justify-start items-center text-lg text-secondary  rounded-lg px-2 py-2 my-2 ${
              pathname == "/company/payDay"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}>
          <MdPayments className='mr-2' />
          <Link href='/company/payDay' >
            Pay Date
          </Link>
        </li>
      </ul>
    </div>
  );
});

AdminSidebar.displayName = "SideBar";

export default AdminSidebar;
