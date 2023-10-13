'use client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BreadCumb from '../../../../../../components/breadCumb/BreadCumb';
import { userContext } from '../../../../../../context/MainContext';

const page = ({ params: { _id } }) => {
  const { token } = useContext(userContext)
  const [company, setCompany] = useState();
  const fetchData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/${_id}`, {
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
    <div className='bg-white border lg:w-3/4 mx-auto border-gray-200 rounded-xl shadow-sm p-6 '>
      <BreadCumb title="Team Member Details" />
      <table class="w-full mt-6 divide-y divide-gray-200 ">
        {/* <thead class="bg-gray-50 ">
                    

                      
                  </thead> */}

        <tbody class="divide-y divide-gray-200 ">
          <tr>
            <th scope="col" class="px-6 py-3 text-left">
              <div class="flex items-center gap-x-2">
                <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Name
                </span>
              </div>
            </th>
            <td class="h-px w-72 whitespace-nowrap">
              <div class="px-6 py-3">
                <span class="block text-md text-secondary">{company?.name}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" class="px-6 py-3 text-left">
              <div class="flex items-center gap-x-2">
                <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Phone
                </span>
              </div>
            </th>
            <td class="h-px w-72 whitespace-nowrap">
              <div class="px-6 py-3">
                <span class="block text-md text-secondary">{company?.phone}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" class="px-6 py-3 text-left">
              <div class="flex items-center gap-x-2">
                <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Address
                </span>
              </div>
            </th>
            <td class="h-px w-72 whitespace-nowrap">
              <div class="px-6 py-3">
                <span class="block text-md text-secondary">{company?.location}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" class="px-6 py-3 text-left">
              <div class="flex items-center gap-x-2">
                <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Latitude
                </span>
              </div>
            </th>
            <td class="h-px w-72 whitespace-nowrap">
              <div class="px-6 py-3">
                <span class="block text-md text-secondary">{company?.latitude}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" class="px-6 py-3 text-left">
              <div class="flex items-center gap-x-2">
                <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Longitude
                </span>
              </div>
            </th>
            <td class="h-px w-72 whitespace-nowrap">
              <div class="px-6 py-3">
                <span class="block text-md text-secondary">{company?.longitude}</span>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div >
  );
};

export default page;