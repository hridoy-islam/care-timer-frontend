'use client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BreadCumb from '../../../../../components/breadCumb/BreadCumb';
import { userContext } from '../../../../../context/MainContext';

const page = ({ params: { _id } }) => {
  const { token } = useContext(userContext)
  const [service, setService] = useState();
  const fetchData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/service/${_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(function (response) {
      // handle success
      setService(response?.data?.data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(service)
  return (
    <div className='bg-white border lg:w-3/4 mx-auto border-gray-200 rounded-xl shadow-sm p-6 '>
      <BreadCumb title="Report Details" />
      <table className="min-w-full mt-6 divide-y divide-gray-200 ">
        {/* <thead className="bg-gray-50 ">
                      
                      
                  </thead> */}

        <tbody className="divide-y divide-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.serviceName}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Date
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.serviceDate}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Task Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.taskList[0]?.taskName}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Time Start
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.serviceTimeStart}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Time End
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.serviceTimeEnd}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Duration
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.duration}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Worker Login
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.workerLogin}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Worker Logout
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.workerLogout}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Status
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">{service?.status}</span>
              </div>
            </td>
          </tr>

          <tr >

          </tr>
        </tbody>
      </table>
    </div >
  );
};

export default page;
