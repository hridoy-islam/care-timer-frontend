'use client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BreadCumb from '../../../../../../components/breadCumb/BreadCumb';
import { userContext } from '../../../../../../context/MainContext';

const page = ({ params: { _id } }) => {
  const { token } = useContext(userContext)
  const [serviceUser, setServiceUser] = useState();
  const fetchData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customer/${_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(function (response) {
      // handle success
      setServiceUser(response?.data?.data)
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6  w-3/4 mx-auto'>
      <BreadCumb title="Team Member Details" />
      <table class="min-w-full mt-6 divide-y divide-gray-200 ">
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
                <span class="block text-md text-secondary">{serviceUser?.name}</span>
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
                <span class="block text-md text-secondary">{serviceUser?.phone}</span>
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
                <span class="block text-md text-secondary">{serviceUser?.location}</span>
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
                <span class="block text-md text-secondary">{serviceUser?.longitude}</span>
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
                <span class="block text-md text-secondary">{serviceUser?.latitude}</span>
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





// import BreadCumb from '../../../../components/breadCumb/BreadCumb';
// import React from 'react';

// const page = () => {
//     return (
//         <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
//             <BreadCumb title="Service User Details" />
//             <div
//                 class="block rounded-lg mt-12 lg:w-2/4  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
//                 <h5
//                     class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
//                    Name : Rex Powlowski
//                 </h5>
//                 <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
//                 Location : 7079 Franey Meadow Suite 920
//                 </p>
//                 <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
//                 Latitude : 85.9772
//                 </p>
//                 <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
//                 company : Brefcceb936
//                 </p>
//         </div>
//         </div >
//     );
// };

// export default page;