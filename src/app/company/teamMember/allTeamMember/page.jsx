"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { toast } from "react-toastify";
import { userContext } from "../../../../context/MainContext";

const Page = () => {
  const router = useRouter();
  const { token, tokenDetails } = useContext(userContext);
  const [teamMember, setTeamMember] = useState();
  const [forceRerender, setForceRerender] = useState(false);
  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(9);
  const fetchData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/worker/?page=${currentPage}&limit=${itemsPerPage}&softDelete=false&company=${tokenDetails?.data?._id}&sort_by={"createdAt":-1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ) 
      .then(function (response) {
        // handle success
        setCurrentPage(response?.data?.data?.metadata?.page);
        setItemsPerPage(response?.data?.data?.metadata?.limit);
        setTotalCount(response?.data?.data?.metadata?.total_count);
        setTeamMember(response?.data?.data);
      });
  };
  // Single Worker Delete
  const handleDelete = async (_id) => {
    const proceed = window.confirm("Are you sure to delete this?");

    try {
      if (proceed) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/worker/${_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            if (!data.success) {
              toast.success("Team Member Archived", {
                position: toast.POSITION.TOP_CENTER,
              });
              setForceRerender(!forceRerender);
              return router.push("/company/teamMember/allTeamMember");
            } else {
              toast.error("Something Error", {
                position: toast.POSITION.TOP_CENTER,
              });
              return router.push("/company/teamMember/allTeamMember");
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

  const handleVerifed = (id, status) => {
    const data = {
      verified: true,
    };
    if (status) {
      return;
    } else {
      axios
        .patch(`${process.env.NEXT_PUBLIC_API_URL}/worker/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          if (!data.success) {
            toast.success("Verified Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            setForceRerender(!forceRerender);
            return router.push("/company/teamMember/allTeamMember");
          } else {
            toast.error("Something Error", {
              position: toast.POSITION.TOP_CENTER,
            });
            return router.push("/company/teamMember/allTeamMember");
          }
        })
        .catch((error) => {
          const res = error.response;
          toast.error(res);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [forceRerender,
    currentPage,
    itemsPerPage]);

  return (
    <div>
      <div className="w-full px-4 py-10 sm:px-3 lg:px-4 lg:py-4 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden  ">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 ">
                      All Team Member
                    </h2>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <Link
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                        href="/company/teamMember/addTeamMember"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Add Team Member
                      </Link>
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2 pl-6">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Team Member
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Phone Number
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center justify-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Action
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 ">
                    {teamMember?.data?.length > 0 &&
                      teamMember?.data?.map((item, index) => (
                        <tr key={index}>
                          <td className="h-px pl-6 w-px whitespace-nowrap">
                            <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-72 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-md text-secondary">
                                {item.phone}
                              </span>
                            </div>
                          </td>
                          <td className="h-px w-24 whitespace-nowrap">
                            <div className="flex justify-evenly ">
                              <div className="hs-tooltip inline-block">
                                <button
                                  type="button"
                                  className="hs-tooltip-toggle text-2xl"
                                  onClick={() =>
                                    handleVerifed(item._id, item.verified)
                                  }
                                >
                                  <MdVerifiedUser
                                    fill={item.verified ? "#61affe" : "#49cc90"}
                                  />
                                  <span
                                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block fixed invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm "
                                    role="tooltip"
                                  >
                                    {item.verified ? "verified" : "unverified"}
                                  </span>
                                </button>
                              </div>
                              <div className="hs-tooltip inline-block">
                                <Link
                                  href={`/company/teamMember/allTeamMember/viewTeamMember/${item._id}`}
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
                                  href={`/company/teamMember/allTeamMember/editTeamMember/${item._id}`}
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
                              <div className="hs-tooltip inline-block pr-2">
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
                              </div>
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
                        {teamMember?.data?.length}
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
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                        Prev
                      </button>
                      {
                        teamMember?.data?.length < 10 ?
                        <button
                        type="button"
                        disabled
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-gray-300 text-gray-700 shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
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
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </button>
                        :
                        <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                        
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
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      </button>
                      }
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
