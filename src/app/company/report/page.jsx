"use client";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt, BiSolidDownload } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import Select from "react-select";
import { userContext } from "../../../context/MainContext";
import { toast } from "react-toastify";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import moment from "moment/moment";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

const Page = () => {
  const targetRef = useRef();
  const [service, setService] = useState();
  const [teamMembers, setTeamMembers] = useState([]);
  const [serviceUsers, setServiceUsers] = useState([]);
  const [teamMember, setTeamMember] = useState("");
  const [serviceUser, setServiceUser] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const { token, tokenDetails } = useContext(userContext);
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(9);

  const { startDate, endDate } = date[0];

  const fetchData = () => {
    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/service?page=${currentPage}&limit=${itemsPerPage}&softDelete=false&company=${tokenDetails?.data?._id}&sort_by={"createdAt":-1}`;
    if (teamMember) {
      apiUrl += `&worker=${teamMember}`;
    }
    if (serviceUser) {
      apiUrl += `&customer=${serviceUser}`;
    }
    if (status) {
      apiUrl += `&status=${status}`;
    }

    if (startDate !== endDate) {
      apiUrl += `&serviceDate=${startDate}&serviceDateEnd=${endDate}`;
    }

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // handle success
        setCurrentPage(response?.data?.data?.metadata?.page);
        setItemsPerPage(response?.data?.data?.metadata?.limit);
        setTotalCount(response?.data?.data?.metadata?.total_count);
        setService(response?.data?.data);
      });
  };

  const fetchTeamMemberData = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/worker?softDelete=false`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (!res.status) {
            throw new Error("Failed to fetch team member data");
          }
          setTeamMembers(res?.data?.data?.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServiceUsersData = () => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/customer?softDelete=false&company=${tokenDetails?.data?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          // handle success
          setServiceUsers(response?.data?.data?.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    teamMember,
    serviceUser,
    status,
    currentPage,
    startDate,
    endDate,
    itemsPerPage,
  ]);

  useEffect(() => {
    fetchTeamMemberData();
    fetchServiceUsersData();
  }, []);

  const teamMembersOption = teamMembers.map((team) => ({
    value: team._id,
    label: team.name,
  }));

  teamMembersOption.unshift({
    value: "",
    label: "All Team Members",
  });

  const serviceUsersOption = serviceUsers.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  serviceUsersOption.unshift({
    value: "",
    label: "All Service User",
  });

  const statusOption = [
    { value: "", label: "All" },
    { value: "active", label: "Active" },
    { value: "complete", label: "Complete" },
    { value: "missed", label: "Missed" },
  ];

  const limitsOption = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
  ];
  const handleDelete = async (_id) => {
    const proceed = window.confirm("Are you sure to delete this?");
    try {
      if (proceed) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/service/${_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            if (!data.success) {
              toast.success("Service Archived", {
                position: toast.POSITION.TOP_CENTER,
              });
            } else {
              toast.error("Something Error", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((error) => {
            const res = error.response;
            toast.error(res);
          });
      }
    } catch (error) {
      alert(error.response);
      toast.error("Something Went Worng");
    }
  };

  return (
    <div>
      <div className="w-full px-4 py-10 sm:px-6 lg:px-4 lg:py-4 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="">
                <button
                  className="py-3 px-6  w-48  mb-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-secondary transition-all text-sm "
                  onClick={() =>
                    generatePDF(targetRef, { filename: "page.pdf" })
                  }
                >
                  Export PDF <BiSolidDownload className="text-xl" />
                </button>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full  ">
                <div className="px-6 py-4 grid gap-3 border-b border-gray-200 ">
                  <div>
                    <div className="flex justify-between items-center gap-x-2">
                      <div className="hs-dropdown relative flex flex-col">
                        <label className="pb-1 pl-1 text-sm font-base font-serif ">
                          Filter By Date
                        </label>
                        <button
                          id="hs-dropdown-transform-style"
                          type="button"
                          className="hs-dropdown-toggle py-3 px-4 flex justify-between items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        >
                          Select Your Date{" "}
                          <span className="pl-8">
                            <SlCalender />
                          </span>
                          {/* <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                          </svg> */}
                        </button>

                        <div className="hs-dropdown-menu w-72 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10">
                          <div
                            className="hs-dropdown-open:ease-in hs-dropdown-open:opacity-100 hs-dropdown-open:scale-100 transition ease-out opacity-0 scale-95 duration-200 mt-2 origin-top-left min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                            aria-labelledby="hs-dropdown-transform-style"
                            data-hs-transition
                          >
                            <DateRange
                              editableDateInputs={true}
                              onChange={(item) => setDate([item.selection])}
                              moveRangeOnFirstSelection={false}
                              ranges={date}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <Calendar
                        onChange={(date) => setDate(date)}
                        date={date}
                      /> */}
                      {/* <div className="flex flex-col">
                        <label className="pb-1 pl-1 text-sm font-base font-serif">
                          From :{" "}
                        </label>
                        <input
                          className="border rounded-md py-1.5 px-3"
                          type="date"
                        ></input>
                      </div>
                      <div className="flex flex-col">
                        <label className="pb-1 pl-1 text-sm font-base font-serif">
                          To :{" "}
                        </label>
                        <input
                          className="border rounded-md py-1.5 px-3"
                          type="date"
                        ></input>
                      </div> */}
                      <div>
                        <label className="pb-1 pl-1 text-sm font-base font-serif ">
                          Filter By Team Member
                        </label>
                        <Select
                          className="w-48 py-1 focus:ring-primary border-gray-300"
                          options={teamMembersOption}
                          onChange={(e) => setTeamMember(e.value)}
                        />
                      </div>

                      <div>
                        <label className="pb-1 pl-1 text-sm font-base font-serif">
                          Filter By Service User
                        </label>
                        <Select
                          className="w-48 py-1  focus:ring-primary border-gray-300"
                          options={serviceUsersOption}
                          onChange={(e) => setServiceUser(e.value)}
                        />
                      </div>

                      <div>
                        <label className="pb-1 pl-1 text-sm font-base font-serif">
                          Filter By Data Limit
                        </label>
                        <Select
                          className="w-48 py-1  focus:ring-primary border-gray-300"
                          options={limitsOption}
                          onChange={(e) => setItemsPerPage(e.value)}
                        />
                      </div>
                      {/* <div>
                        <label className="pb-1 pl-1 text-sm font-base font-serif">
                          Filter By Status
                        </label>
                        <Select
                          className="w-48 py-1  focus:ring-primary border-gray-300"
                          options={statusOption}
                          onChange={(e) => setStatus(e.value)}
                        />
                      </div> */}

                      {/* <DateRangePicker /> */}
                    </div>
                  </div>
                </div>
                <table
                  ref={targetRef}
                  className="min-w-full divide-y divide-gray-200 "
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2 pl-6">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Service Name
                          </span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2 pl-6">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Service User
                          </span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2 pl-6">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Service Date
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Service Time Start
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Service Time End
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Team Member
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Duration
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Worker Login
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Worker Logout
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Comment
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2 justify-center">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Action
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 ">
                    {service?.data?.length > 0 &&
                      service?.data?.map((item, index) => (
                        <tr key={index}>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.serviceName}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.customer?.name}
                              </span>
                            </div>
                          </td>
                          <td className="h-px pl-6 w-px whitespace-nowrap">
                            <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                              <span className="block text-md text-secondary">
                                {moment(item.serviceDate).format("MMM Do YY")}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.serviceTimeStart}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.serviceTimeEnd}
                              </span>
                            </div>
                          </td>

                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.worker?.name}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {service?.duration
                                  ? service?.duration
                                  : "Not Found"}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {service?.workerLogin
                                  ? service?.workerLogin
                                  : "Not Found"}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {service?.workerLogout
                                  ? service?.workerLogout
                                  : "Not Found"}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {service?.comment
                                  ? service?.comment
                                  : "Not Comment yet"}
                              </span>
                            </div>
                          </td>

                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="flex justify-evenly ">
                              <div className="hs-tooltip inline-block">
                                <Link
                                  href={`/company/report/viewReport/${item._id}`}
                                >
                                  <button
                                    type="button"
                                    className="hs-tooltip-toggle text-2xl"
                                  >
                                    <AiOutlineEye fill="#979797" />
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block fixed invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                      role="tooltip"
                                    >
                                      View
                                    </span>
                                  </button>
                                </Link>
                              </div>
                              <div className="hs-tooltip inline-block">
                                <Link
                                  href={`/company/report/editReport/${item._id}`}
                                >
                                  <button
                                    type="button"
                                    className="hs-tooltip-toggle text-2xl"
                                  >
                                    <BiEditAlt fill="#979797" />
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block fixed invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                      role="tooltip"
                                    >
                                      Edit
                                    </span>
                                  </button>
                                </Link>
                              </div>
                              {/* <div className="hs-tooltip inline-block pr-2">
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  type="button"
                                  className="hs-tooltip-toggle text-xl"
                                >
                                  <BsTrash3 fill="red" />
                                  <span
                                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block fixed invisible z-10 py-1 px-2 bg-red-800 text-xs font-medium text-white rounded-md shadow-sm "
                                    role="tooltip"
                                  >
                                    Delete
                                  </span>
                                </button>
                              </div> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 ">
                  <div>
                    <p className="text-sm text-gray-600 ">
                      <span className="font-semibold text-gray-800 ">
                        {service?.data?.length}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm      "
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
