"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BreadCumb from "../../../../../../components/breadCumb/BreadCumb";
import { userContext } from "../../../../../../context/MainContext";

const Page = ({ params: { _id } }) => {
  const { token } = useContext(userContext);
  const [teamMember, setTeamMember] = useState({
    name: "",
    phone: "",
    password: "",
    holidays: 0,
  });
  const router = useRouter();
  const { handleSubmit } = useForm();

  const onsubmit = (data) => {
    const updatedData = { ...teamMember, ...data };
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/worker/${_id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (!data.success) {
          toast.success("Team Member Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push("/company/teamMember/allTeamMember");
        } else {
          toast.error("Something Error", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push("/company/teamMember/editTeamMember");
        }
      })
      .catch((error) => {
        const res = error.response;
        toast.error(res);
      });
  };

  const fetchData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/worker/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setTeamMember(response?.data?.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4">
        <BreadCumb title="Update Team Member" />
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="container mx-auto py-4"
        >
          <div className="space-y-12 mt-8">
            <div className="pb-4">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="name"
                      required
                      value={teamMember.name}
                      onChange={(e) =>
                        setTeamMember({ ...teamMember, name: e.target.value })
                      }
                      className="block w-full pl-4 rounded-md border-0 py-2 text-[gray-900 ] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder="phone"
                      required
                      value={teamMember.phone}
                      onChange={(e) =>
                        setTeamMember({ ...teamMember, phone: e.target.value })
                      }
                      className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8 mt-4">
            <div className="border-b border-gray-900/10 pb-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      required
                      value={teamMember.password}
                      onChange={(e) =>
                        setTeamMember({
                          ...teamMember,
                          password: e.target.value,
                        })
                      }
                      className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Holidays
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="holidays"
                      id="holidays"
                      placeholder="holidays"
                      required
                      value={teamMember.holidays}
                      onChange={(e) =>
                        setTeamMember({
                          ...teamMember,
                          holidays: e.target.value,
                        })
                      }
                      className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center lg:justify-end justify-center gap-x-12 ">
            <button
              type="submit"
              className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Update Team Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
