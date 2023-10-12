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
    const [serviceUser, setServiceUser] = useState();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const onsubmit = data =>
        axios.patch( `http://localhost:5000/customer/${_id}`, data,  {
            headers: {
            'Authorization': `Bearer ${token}`
            }
            }).then(({ data }) => {
                    if (!data.success) {
                      toast.success('Service User Update Successfully', {
                        position: toast.POSITION.TOP_CENTER
                      });
                      return router.push('/company/serviceUser/allServiceUser')
                    }
                    else {
                      toast.error("Something Error", {
                        position: toast.POSITION.TOP_CENTER
                      });
                      return router.push('/company/serviceUser/editServiceUser')
                    }
                  })
            .catch(error => {
                const res = error.response;
                toast.error(res);
            });
    const fetchData = () => {
        axios.get( `http://localhost:5000/customer/${_id}`, {
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
    console.log(serviceUser)
    return (
        <div>
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
            <BreadCumb title="Update Service User" />
            <form onSubmit={handleSubmit(onsubmit)} className='container mx-auto py-4'>
                    <div className="space-y-12 mt-8">
                        <div className=" pb-4">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                    Service User Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder='name'
                                            required
                                            defaultValue={serviceUser?.name}
                                            className="block w-full pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('name')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                    Latitude
                                    </label>
                                    <div className="mt-2">
                                    <input
                                            type="text"
                                            name="latitude"
                                            id="latitude"
                                            placeholder='latitude'
                                            required
                                            defaultValue={serviceUser?.latitude}
                                            className="block w-full pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('latitude')}
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
                                    Longitude
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="longitude"
                                            id="longitude"
                                            placeholder='longitude'
                                            required
                                            defaultValue={serviceUser?.longitude}
                                            className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('longitude')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder='address'
                                            required
                                            defaultValue={serviceUser?.location}
                                            className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('location')}
                                        />
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center lg:justify-end justify-center gap-x-12 ">
                        <button type="submit" class="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Update Service User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;