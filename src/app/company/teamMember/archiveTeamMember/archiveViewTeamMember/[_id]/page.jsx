'use client';
import axios from 'axios';
import BreadCumb from '../../../../../../components/breadCumb/BreadCumb'
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import { userContext } from '../../../../../../context/MainContext';

const page = ({params: {_id}}) => {
  const {token} = useContext(userContext)
  const [company, setCompany] = useState();
  console.log(process.env.DB_HOST)
  const fetchData = () => {
    axios.get( `http://localhost:5000/worker/${_id}`, {
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
                             Phone Number
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
                          Holidays
                          </span>
                        </div>
                      </th>                      
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">{company?.holidays}</span>
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