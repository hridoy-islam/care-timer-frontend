'use client';
import axios from 'axios';
import BreadCumb from '../../../../../../components/breadCumb/BreadCumb';
import React, { useEffect, useState } from 'react';

const page = ({params: {_id}}) => {
    const [teamMember, setTeamMember] = useState();
    const fetchData = () => {
        axios.get(`https://clockin-backend.vercel.app/worker/${_id}`)
            .then(function (response) {
                // handle success
                setTeamMember(response.data.data)
            })
    }
    useEffect(() => {
      fetchData()
    }, [])
    return (
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
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
                          <span class="block text-md text-secondary">{teamMember?.name}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                    <th scope="col" class="px-6 py-3 text-left">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                             Number
                          </span>
                        </div>
                      </th>                      
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">{teamMember?.phone}</span>
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
                          <span class="block text-md text-secondary">{teamMember?.holidays}</span>
                        </div>
                      </td>
                    </tr>
                    {/* <tr>            
                    <th scope="col" class="px-6 py-3 text-left">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Company Contact Number
                          </span>
                        </div>
                      </th>          
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">{teamMember?.phone}</span>
                        </div>
                      </td>
                    </tr> */}
                    {/* <tr>  
                    <th scope="col" class="px-6 py-3 text-left">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Task List
                          </span>
                        </div>
                      </th>                    
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">7</span>
                        </div>
                      </td>                     

                    </tr> */}
                  <tr >
                      
                      
                      
                      
                      

                    </tr>
                  </tbody>
                </table>
        </div >
    );
};

export default page;