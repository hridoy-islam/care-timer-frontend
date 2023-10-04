
import BreadCumb from '../../../../components/breadCumb/BreadCumb';
import React from 'react';

const page = () => {
    return (
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4'>
            <BreadCumb title="Report Details" />
            <div
                class="block rounded-lg mt-12 lg:w-2/4  bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Service Date : 2024-03-24
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Service Time Start : 13:55
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Service Time End :09:45
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Company : Brefcceb936
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Status : Pending
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Team Member Login : 11:24
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Team Member Logout : 24:38
                </p>
                <p class="mb-4 text-normal text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Comment : Provident est fugiat non. Dicta alias quod consequuntur. Necessitatibus asperiores aut at nisi odit vero. Eligendi sapiente fugit ratione distinctio reprehenderit. Animi temporibus dolorum excepturi exercitationem.
                </p>
            </div>
        </div >
    );
};

export default page;