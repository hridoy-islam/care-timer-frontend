"use client"
import axios from 'axios';
import BreadCumb from '../../../../components/breadCumb/BreadCumb';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import {  userContext } from '../../../../context/MainContext';

const page = () => {  
//     const  userDetails   = JSON.parse(localStorage?.getItem('details'));
// console.log(userDetails?.data?._id)
// const tokenDetails = JSON.parse.localStorage?.getItem('details');
const {tokenDetails} = useContext(userContext)
console.log(tokenDetails)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const onsubmit = data => {
        console.log(data)
       axios.post(`http://localhost:5000/worker`, data)
        .then(( {data} ) => {
            console.log(data)
            if (!data.success) {
                toast.success('Team Member Added', {
                    position: toast.POSITION.TOP_CENTER
                  });
                return router.push('/company/teamMember/allTeamMember')
            }
            else {
                toast.error("Something Error", {
                position: toast.POSITION.TOP_CENTER
              });
              return router.push('/company/teamMember/addTeamMember')
            };
            reset()
       })
       .catch(error => {
           const res = error.response;
           toast.error(res);
       });
    }
    return (
        <div>
            
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
            <BreadCumb title="Create Team Member" />
                <form onSubmit={handleSubmit(onsubmit)} className='container mx-auto py-4'>
                    <div className="space-y-12 mt-8">
                        <div className=" pb-4">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder='name'
                                            required
                                            className="block w-full pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('name')}

                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="phone"
                                            name="phone"
                                            id="phone"
                                            placeholder='phone'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('phone')}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="space-y-8 mt-4">
                        <div className="border-b border-gray-900/10 pb-8">
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder='password'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('password')}

                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                        Holidays
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="holidays"
                                            id="holidays"
                                            placeholder='holidays'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('holidays')}

                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                        Company
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="company"
                                            id="company"
                                            placeholder='company'
                                            required
                                            defaultValue={tokenDetails?.data?._id}
                                            className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('company')}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center lg:justify-end justify-center gap-x-12 ">
                        <button type="submit" class="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Create Team Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;