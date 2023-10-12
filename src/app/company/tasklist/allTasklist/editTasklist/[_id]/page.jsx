"use client"
import axios from 'axios';
import BreadCumb from '../../../../../../components/breadCumb/BreadCumb';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { userContext } from '../../../../../../context/MainContext';

const page = ({params: {_id}}) => {
    const {token} = useContext(userContext);
    const [tasklist, setTasklist] = useState();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const onsubmit = data =>
        axios.patch( `http://localhost:5000/tasklist/${_id}`, data,  {
            headers: {
            'Authorization': `Bearer ${token}`
            }
            }).then(({ data }) => {
                    if (!data.success) {
                      toast.success('Task List Update Successfully', {
                        position: toast.POSITION.TOP_CENTER
                      });
                      return router.push('/company/tasklist/allTasklist')
                    }
                    else {
                      toast.error("Something Error", {
                        position: toast.POSITION.TOP_CENTER
                      });
                      return router.push('/company/tasklist/allTasklist')
                    }
                  })
            .catch(error => {
                const res = error.response;
                toast.error(res);
            });
    const fetchData = () => {
        axios.get( `http://localhost:5000/tasklist/${_id}`, {
          headers: {
          'Authorization': `Bearer ${token}`
          }
          }).then(function (response) {
            // handle success
            setTasklist(response?.data?.data)
          })
    }
    useEffect(() => {
      fetchData()
    }, [])
    console.log(tasklist)
    return (
        <div>
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
            <BreadCumb title="Edit TaskList" />
                <form onSubmit={handleSubmit(onsubmit)} className='container mx-auto py-4'>
                    <div className="space-y-12 mt-8">
                        <div className=" pb-4">
                            <div className="mt-10 grid lg:grid-cols-1 gap-x-6 gap-y-8 ">
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
                                            defaultValue={tasklist?.taskName}
                                            className="block w-full lg:w-2/4 pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('taskName')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center lg:justify-start justify-center gap-x-12 ">
                        <button type="submit" class="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Update Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;