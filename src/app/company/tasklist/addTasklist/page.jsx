"use client"
import axios from 'axios';
import BreadCumb from '../../../../components/breadCumb/BreadCumb';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { userContext } from '../../../../context/MainContext';
import { useRouter } from 'next/navigation';

const page = () => {
    const {token, tokenDetails} = useContext(userContext)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const onsubmit = data => {
        axios.post( `http://localhost:5000/tasklist`, data,  {
         headers: {
         'Authorization': `Bearer ${token}`
         }
         }).then(( {data} ) => {
            if (!data.success) {
                toast.success('Task Added', {
                    position: toast.POSITION.TOP_CENTER
                  });
                return router.push('/')
            }
            else {
                toast.error("Something Error", {
                position: toast.POSITION.TOP_CENTER
              });
              return router.push('/r')
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
            <BreadCumb title="Create TaskList" />
                <form onSubmit={handleSubmit(onsubmit)} className='container mx-auto py-4'>
                    <div className="space-y-12 mt-8">
                        <div className=" pb-4">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                    Task Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="taskName"
                                            id="taskName"
                                            placeholder='task name'
                                            required
                                            className="block w-full pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('taskName')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                    Status
                                    </label>
                                    <div className="mt-2">
                                    <select name="status" id="status"  {...register('status')}className="block w-full lg:w-full pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6">
                                <option disabled selected value={''}>Status</option>

                                <option value={'Pending'}>Pending</option>
                                <option value={'Approve'}>Approve</option>
                                <option value={'Completed'}>Completed</option>
                            </select>
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
                    <div className="mt-6 flex items-center lg:justify-start justify-center gap-x-12 ">
                        <button type="submit" class="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;