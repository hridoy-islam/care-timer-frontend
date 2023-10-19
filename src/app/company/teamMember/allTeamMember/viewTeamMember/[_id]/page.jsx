"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BreadCumb from "../../../../../../components/breadCumb/BreadCumb";
import { userContext } from "../../../../../../context/MainContext";

const page = ({ params: { _id } }) => {
  const { token } = useContext(userContext);
  const [teamMember, setTeamMember] = useState();
  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/worker/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // handle success
        setTeamMember(response?.data?.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4">
      <BreadCumb title="Team Member Details" />
      <table className="min-w-full mt-6 divide-y divide-gray-200 ">
        {/* <thead className="bg-gray-50 ">



                  </thead> */}

        <tbody className="divide-y divide-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Name
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">
                  {teamMember?.name}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Number
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">
                  {teamMember?.phone}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                  Holidays
                </span>
              </div>
            </th>
            <td className="h-px w-72 whitespace-nowrap">
              <div className="px-6 py-3">
                <span className="block text-md text-secondary">
                  {teamMember?.holidays}
                </span>
              </div>
            </td>
          </tr>
          {/* <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Company Contact Number
                          </span>
                        </div>
                      </th>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="block text-md text-secondary">{teamMember?.phone}</span>
                        </div>
                      </td>
                    </tr> */}
          {/* <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-medium uppercase tracking-wide text-gray-800 ">
                          Task List
                          </span>
                        </div>
                      </th>
                    <td className="h-px w-72 whitespace-nowrap">
                        <div className="px-6 py-3">
                          <span className="block text-md text-secondary">7</span>
                        </div>
                      </td>

                    </tr> */}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
