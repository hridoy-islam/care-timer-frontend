"use client"
import React, { useContext, useState } from 'react';
import BreadCumb from '../../../../components/breadCumb/BreadCumb'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { BiSolidHide, BiShow } from "react-icons/bi";
import { userContext } from '../../../../context/MainContext';


const page = () => {
    const {token} = useContext(userContext)
    const router = useRouter()
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onsubmit = data => {
       axios.post( `http://localhost:5000/company`, data,  {
        headers: {
        'Authorization': `Bearer ${token}`
        }
        } ).then(({ data }) => {
                if (!data.success) {''
                    toast.success('Create Company', {
                        position: toast.POSITION.TOP_CENTER
                      });
                    return router.push('/admin/company/allCompany')
                }
                else {
                    toast.error("Something Error", {
                    position: toast.POSITION.TOP_CENTER
                  });
                  return router.push('/admin/company/addCompany')
                }
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
                <BreadCumb title="Create Company" />
                <form onSubmit={handleSubmit(onsubmit)} className='container mx-auto py-4'>
                    <div className="space-y-12 mt-8">
                        <div className=" pb-4">
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Company Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder='name'
                                            required
                                            className="block w-full pl-4 rounded-md border-0 py-3 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('name')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Company Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder='email'
                                            required
                                            className="block w-full pl-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('email')}
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
                                    <label htmlFor="region" className="block text-md font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    {/* <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="contact-password"
                                            placeholder='password'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('password')}
                                        />
                                    </div> */}
                                    <div className="input-group mt-4 relative">
                                <input type={passwordType} {...register('password')}  name="password" class="form-control pl-4 w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                                <div className="input-group-btn absolute right-4 top-3">
                                    <button type='button' className="btn btn-outline-primary text-xl" onClick={togglePassword}>
                                        {passwordType === "password" ? <BiSolidHide/> : <BiShow/>}
                                    </button>
                                </div>
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
                                            className="block pl-4 w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('phone')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder='address'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('address')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="region" className="block text-md font-medium leading-6 text-gray-900">
                                        Contact Person Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="contactName"
                                            id="contact-name"
                                            placeholder='name'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('contactName')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="region" className="block text-md font-medium leading-6 text-gray-900">
                                        Contact Person Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="phone"
                                            name="contactPhone"
                                            id="contactPhone"
                                            placeholder='phone'
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('contactPhone')}
                                        />
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center lg:justify-end justify-center gap-x-12 ">
                        <button type="submit" class="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Create Company
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;