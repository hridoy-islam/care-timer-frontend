'use client';

import { useContext, useEffect, useState } from 'react';
import {  useForm } from 'react-hook-form';
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { userContext } from '../../../context/MainContext';

const Page = () => {    
  const { register, handleSubmit } = useForm();
  const [payDate, setPayDate] = useState();
  const { token, tokenDetails } = useContext(userContext);
  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/payday/?company=${tokenDetails?.data?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        // handle success
        setPayDate(response?.data?.data);
      });
  };
  console.log(payDate)
   useEffect(() => {
    fetchData();
  }, []);
  const onsubmit = data => {
    console.log(data);
}
  return (
    <div>
      <div class="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-4 content-none  mx-auto">
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden  ">
                <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                  <div>
                    {
                      payDate?.data?.length > 0 ?
                      <h2 class="text-2xl font-semibold text-gray-800 ">
                    Next Pay Day - {payDate?.data[0]?.nextpayday}
                    </h2>
                    :
                    <h2 class="text-2xl font-semibold text-gray-800 ">
                    Next Pay Day - No Date Selected
                    </h2>
                    }
                  </div>

                  <div>
                    <div class="inline-flex gap-x-2">
                      

                      
                    </div>
                  </div>
                </div>
                <div class="py-12 px-12 ">
                  {
                    payDate?.data?.length < 0 ?
                    <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col'>
                    <input
                        className="border rounded-md py-1.5 px-3 w-4/12 mb-8"
                        type="date"  pattern="\d{4}-\d{2}-\d{2}" {...register('date')} 
                      ></input>
                      <div>
                      <button type="submit" class="py-3 px-8  justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                          Create Pay Date 
                      </button>
                      </div>
                    </form>
                    :
                    <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col'>
                      <input
                          className="border rounded-md py-1.5 px-3 w-4/12 mb-8"
                          type="date"  pattern="\d{4}/\d{2}/\d{2}" {...register('date')} 
                        ></input>
                        <div>
                        <button type="submit" class="py-3 px-8  justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Update 
                        </button>
                        </div>
                      </form>
                  }
                      

                      
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