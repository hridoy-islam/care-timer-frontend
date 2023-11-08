'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { userContext } from '../../../../context/MainContext';

const Page = () => {
  const { token } = useContext(userContext)
  const [company, setCompany] = useState();
  const fetchData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company?softDelete=true&role=company&sort_by={"updatedAt":-1}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(function (response) {
      // handle success
      setCompany(response?.data?.data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <div className="w-full px-4 py-10 sm:px-6 lg:px-4 lg:py-4 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden  ">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 ">
                      Archive Company
                    </h2>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>

                      <th scope="col" className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left">
                        <div className="flex items-center gap-x-2 pl-6">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Company Name
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Company Email
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                            Address
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
                    {company?.data?.length > 0 && company?.data?.map((item, index) => <tr key={index}>
                      <td className="h-px pl-6 w-px whitespace-nowrap">
                        <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                          <span className="block text-md text-secondary">{item.name
                          }</span>
                        </div>
                      </td>
                      <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="block text-md text-secondary">{item.email}</span>
                        </div>
                      </td>
                      <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="block text-md text-secondary">{item.address}</span>
                        </div>
                      </td>

                      <td className="h-px w-36 whitespace-nowrap">
                        <div className="flex justify-evenly ">
                          <div className="hs-tooltip inline-block">
                            <Link href={`/admin/company/archiveCompany/archiveViewCompany/${item._id}`}>
                              <button type="button" className="hs-tooltip-toggle text-2xl">
                                <AiOutlineEye fill="#979797" />
                                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm " role="tooltip">
                                  View
                                </span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>)}
                  </tbody>
                </table>
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 ">
                  <div>
                    <p className="text-sm text-gray-600 ">
                      <span className="font-semibold text-gray-800 ">{company?.data?.length}</span> results
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm     dark:hover:text-white ">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                        Prev
                      </button>

                      <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm     dark:hover:text-white ">
                        Next
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
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