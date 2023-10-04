import BreadCumb from '../../../../components/breadCumb/BreadCumb';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
            <BreadCumb title="Service User Details" />
            <div
                class="block rounded-lg mt-12 lg:w-2/4  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h5
                    class="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                   Name : Rex Powlowski
                </h5>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Location : 7079 Franey Meadow Suite 920
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Latitude : 85.9772
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                company : Brefcceb936
                </p>
        </div>
        </div >
    );
};

export default page;