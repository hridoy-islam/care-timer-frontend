"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MenuContext } from '../../context/MenuContext';
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()
    const { tokenDetails, token , setToken, setTokenDetails} = useContext(MenuContext);
    console.log(tokenDetails, token)
    if (tokenDetails?.role == 'admin') {
        return router.push('/admin')
    }
    else if(tokenDetails?.role == 'company'){
        return router.push('/company')
    }
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    // const onsubmit = async () => {
    //     const data = await signIn("credentials", data, {
    //       email: email,
    //       password: pass,
    //       redirect: true,
    //       callbackUrl: '/'
    //     });
    //     console.log(result)
    //     console.log(email, pass)
    //   };
    const onsubmit = data =>{
        axios.post(`https://clockin-backend.vercel.app/auth/login`, data)
        .then(({ data }) => {
            // console.log(data)
            // localStorage.setItem('details', JSON.stringify(data));
            if (!data.success) {
                toast.success(data.message);
                // localStorage.setItem('timertoken', data?.data?.token);
                localStorage.setItem('details', JSON.stringify(data?.data));
                setTokenDetails(data.data);
                setToken(data.data.token);
                
                
            }
            else {
                toast.error(data.message);
            }
            
            
        })
        .catch(error => {
            // toast.error(error.message);
        });
    }
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6
         lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Care Timer
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onsubmit)} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    
                                    {...register('email')}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                    {...register('password')}
                                />
                            </div>
                        </div>

                        <div>
                            {/* <Link href='/admin'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center my-4 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    Admin Login Demo
                                </button>
                            </Link> */}
                            
                                <button
                                    type='submit'
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    Log In
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default page;