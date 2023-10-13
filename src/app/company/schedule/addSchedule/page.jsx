'use client';
import axios from 'axios';
import BreadCumb from '../../../../components/breadCumb/BreadCumb';
import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select'
import { userContext } from '../../../../context/MainContext';
import { Controller, useController, useForm } from 'react-hook-form';
const page = () => { 
    const { token, tokenDetails } = useContext(userContext)
    // const [tasklist, setTasklist] = useState();
    // const [tasklist, setTasklist] = useState();
    const [tasklist, setTasklist] = useState();
    const taskFetchData = () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasklist?softDelete=false&company=${tokenDetails?.data?._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(function (response) {
        // handle success
        setTasklist(response?.data?.data)
      })
    }
    useEffect(() => {
        taskFetchData()
    }, [])
    console.log(tasklist?.data)


    const {
        register,
        handleSubmit,
        reset,
        control
    } = useForm();
    const onsubmit = data => {
        console.log(data);
        reset
    }
    const teamMember = [
        { value: 'Vin', label: 'Vin' },
        { value: 'John', label: 'John' },
        { value: 'Philip', label: 'Philip' }
    ]
    const serviceUser = [
        { value: 'Dom', label: 'Dom' },
        { value: 'Harry', label: 'Harry' },
        { value: 'Tony', label: 'Tony' }
    ]
    const taskList = [
        { value: 'Pliers and Drills', label: 'Pliers and Drills' },
        { value: 'Repairing Wiring Systems', label: 'Repairing Wiring Systems' },
        { value: 'Installing Electrical Conduits', label: 'Installing Electrical Conduits' }
    ]
    const { field: { value: teamValue, onChange: teamOnChange, ...teamField } } = useController({ name: 'teamMemberName', control });

    const { field: { value: serviceValue, onChange: serviceOnChange, ...serviceField } } = useController({ name: 'serviceUserName', control });

    const { field: { value: taskValue, onChange: taskOnChange, ...taskField } } = useController({ name: 'taskName', control });

    return (
        <div>
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4 '>
                <BreadCumb title="Create Schedule" />
                <form onSubmit={handleSubmit(onsubmit)} className='container mx-auto py-4'>
                    <div className="space-y-12 mt-8">
                        <div className=" pb-4">
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Service date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="service-date"
                                            id="date"
                                            placeholder='date'
                                            className="block w-full px-4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('service-date')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="street-address" className="block text-md font-medium leading-6 text-gray-900">
                                        Service Time Start
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="service-time-start"
                                            id="serviceTimeStart"
                                            placeholder='serviceTimeStart'
                                            className="block px-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 "
                                            {...register('service-time-start')}
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
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                        Service Time End
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="service-time-end"
                                            id="service-time-end"
                                            placeholder='serviceTimeEnd'
                                            className="block px-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                            {...register('service-time-end')}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="region" className="block text-md font-medium leading-6 text-gray-900">
                                        Service User
                                    </label>
                                    <div className="mt-2">
                                        <Select
                                            className='select-input'
                                            placeholder="Select Service User"
                                            isClearable
                                            options={serviceUser}
                                            value={serviceValue ? serviceUser.find(x => x.value === serviceValue) : serviceValue}
                                            onChange={option => serviceOnChange(option ? option.value : option)}
                                            {...serviceField}
                                        />


                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <label htmlFor="region" className="block text-md font-medium leading-6 text-gray-900">
                                        Team Member
                                    </label>
                                    <div className="mt-2">
                                        <Select
                                            className='select-input'
                                            placeholder="Select Team Member"
                                            isClearable
                                            options={teamMember}
                                            value={teamValue ? teamMember.find(x => x.value === teamValue) : teamValue}
                                            onChange={option => teamOnChange(option ? option.value : option)}
                                            {...teamField}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <label htmlFor="region" className="block text-md font-medium leading-6 text-gray-900">
                                        Task List
                                    </label>
                                    <div className="mt-2">
                                    <Select
                                            className='select-input'
                                            placeholder="Select Team Member"
                                            isClearable
                                            options={taskList}
                                            value={taskValue ? taskList.find(x => x.value === taskValue) : taskValue}
                                            onChange={option => taskOnChange(option ? option.value : option)}
                                            {...taskField}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center lg:justify-end gap-x-12 ">
                        <button type="submit" class="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                            Create Schedule
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;