"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BreadCumb from "../../../../../components/breadCumb/BreadCumb";
import { userContext } from "../../../../../context/MainContext";
import moment from "moment-timezone";

const page = ({ params: { _id } }) => {
  const { token } = useContext(userContext);
  const [service, setService] = useState();
  // Time Convert
  const seconds = Math.floor((service?.duration / 1000) % 60);
  const minutes = Math.floor((service?.duration / (1000 * 60)) % 60);
  const hours = Math.floor((service?.duration / (1000 * 60 * 60)) % 24);
  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/service/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // handle success
        setService(response?.data?.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white border lg:w-3/4 mx-auto border-gray-200 rounded-xl shadow-sm lg:p-6 p-3">
      <BreadCumb title="Report Details" />
      <table className="min-w-full mt-6 divide-y divide-gray-200 ">
        {/* <thead className="bg-gray-50 ">


                  </thead> */}

        <tbody className="divide-y divide-gray-200 ">
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.serviceName}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Date
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {moment(service?.serviceDate).format("L")}
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Time Start
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.serviceTimeStart}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service Time End
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.serviceTimeEnd}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Team Member Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.worker?.name}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Team Member Phone
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.worker?.phone}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service User Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.customer?.name}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service User Address
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.customer?.location}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Service User Phone
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.customer?.phone}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Duration (H:M:S)
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.duration
                    ? `${hours} : ${minutes} : ${seconds}`
                    : "Not Found"}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Worker Login
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.workerLogin
                    ? moment
                        .tz(service?.workerLogin, "Europe/London")
                        .format("LT")
                    : "Not Found"}
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Worker Logout
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.workerLogout
                    ? moment
                        .tz(service?.workerLogout, "Europe/London")
                        .format("LT")
                    : "Not Found"}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Comment
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">
                  {service?.comment ? service?.comment : "Not Comment yet"}
                </span>
              </div>
            </td>
          </tr>
          {/* <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Status
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <span className="block text-md text-secondary">{service?.status}</span>
              </div>
            </td>
          </tr> */}

          <tr>
            <th scope="col" className="px-4 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Task Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-4 py-3">
                <ul className="list-disc space-y-2">
                  {service?.taskList?.map((item, index) => {
                    return (
                      <li key={index}>
                        <span className="block text-md text-secondary">
                          {item.taskName}
                          <span
                            className={`inline-flex items-center ml-2 gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${
                              item.status === "completed" &&
                              "bg-green-100 text-green-800"
                            } ${
                              item.status === "pending" &&
                              "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
