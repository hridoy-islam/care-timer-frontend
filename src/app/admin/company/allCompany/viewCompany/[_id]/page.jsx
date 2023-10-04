'use client';
import axios from 'axios';
import BreadCumb from '../../../../../../components/breadCumb/BreadCumb'
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

const page = ({params: {_id}}) => {
  const [company, setCompany] = useState();
  const fetchData = () => {
    axios.get(`https://clockin-backend.vercel.app/company/${_id}
    `)
      .then(function (response) {
        // handle success
        setCompany(response.data.data)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log(company)
  
    return (
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
            <BreadCumb title="Company Details" />
            <table class="min-w-full mt-6 divide-y divide-gray-200 ">
                  {/* <thead class="bg-gray-50 ">
                    

                     

                      

                      
                     
                      
                      
                  </thead> */}

                  <tbody class="divide-y divide-gray-200 ">
                    <tr>
                    <th scope="col" class="px-6 py-3 text-left">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Company Name
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
                            Company Email
                          </span>
                        </div>
                      </th>                      
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">{company?.email}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>      
                    <th scope="col" class="px-6 py-3 text-left">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Company Contact Name
                          </span>
                        </div>
                      </th>                
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">{company?.contactName}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>            
                    <th scope="col" class="px-6 py-3 text-left">
                        <div class="flex items-center gap-x-2">
                          <span class="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Company Contact Number
                          </span>
                        </div>
                      </th>          
                    <td class="h-px w-72 whitespace-nowrap">
                        <div class="px-6 py-3">
                          <span class="block text-md text-secondary">{company?.phone}</span>
                        </div>
                      </td>
                    </tr>
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
            {/* <div
                class="block rounded-lg mt-12 w-2/4  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Name : Powlowski, Schuster and Wintheiser
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Email : ilene_Strosin12@hotmail.com
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Address : 76918 Morissette Lights Suite 551
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Phone: 6964644145
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Contact Name: Madison Casper
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Contact phone: 7869869054
                </p>
            </div> */}
        </div >
    );
};

export default page;