"use client";
import axios from "axios";
import BreadCumb from "../../../../components/breadCumb/BreadCumb";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { userContext } from "../../../../context/MainContext";
import { Controller, useController, useForm } from "react-hook-form";
import moment from "moment";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const page = () => {
  const router = useRouter();
  const { token, tokenDetails } = useContext(userContext);
  const [taskList, setTaskList] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [serviceUsers, setServiceUsers] = useState([]);
  // const [tasklist, setTasklist] = useState();
  const taskFetchData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasklist?softDelete=false&company=${tokenDetails?.data?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        // handle success
        setTaskList(response?.data?.data?.data);
      });
  };

  const fetchTeamMemberData = () => {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/worker?softDelete=false`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (!res.status) {
            throw new Error("Failed to fetch team member data");
          }
          setTeamMembers(res?.data?.data?.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServiceUsersData = () => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/customer?softDelete=false&company=${tokenDetails?.data?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          // handle success
          setServiceUsers(response?.data?.data?.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    taskFetchData();
    fetchTeamMemberData();
    fetchServiceUsersData();
  }, []);

  const taskListOption = taskList.map((task) => ({
    value: task._id,
    label: task.taskName,
    status: "pending",
  }));

  const teamMembersOption = teamMembers.map((team) => ({
    value: team._id,
    label: team.name,
  }));

  const serviceUserOption = serviceUsers.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const { register, handleSubmit, reset, control } = useForm();

  const {
    field: { value: teamValue, onChange: teamOnChange, ...teamField },
  } = useController({ name: "worker", control });

  const {
    field: { value: serviceValue, onChange: serviceOnChange, ...serviceField },
  } = useController({ name: "customer", control });

  const {
    field: { value: taskValue, onChange: taskOnChange, ...taskField },
  } = useController({ name: "taskList", control });

  const onsubmit = (data) => {

    const { serviceDate } = data;
    const formatServiceDate = moment(serviceDate).format();
    const modifyData = { ...data, serviceDate: formatServiceDate };
    console.log(modifyData)
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/service`, modifyData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function ({ status }) {
          // handle success
          if (status === 200) {
            toast.success("Schedule Created Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
    reset;
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mx-4 ">
        <BreadCumb title="Create Schedule" />
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="container mx-auto py-4"
        >
          <div className="space-y-12 mt-8">
            <div className=" pb-4">
              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Service name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="serviceName"
                      id="serviceName"
                      placeholder="Service Name"
                      className="block w-full px-4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      {...register("serviceName")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Service date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="serviceDate"
                      id="date"
                      placeholder="mm/dd/yyyy"
                      className="block w-full px-4 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      {...register("serviceDate")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Service Time Start
                  </label>
                  <div className="mt-2">
                    <input
                      type="time"
                      name="serviceTimeStart"
                      id="serviceTimeStart"
                      placeholder="serviceTimeStart"
                      className="block px-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 "
                      {...register("serviceTimeStart")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Service Time End
                  </label>
                  <div className="mt-2">
                    <input
                      type="time"
                      name="serviceTimeEnd"
                      id="serviceTimeEnd"
                      placeholder="serviceTimeEnd"
                      className="block px-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      {...register("serviceTimeEnd")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Service User
                  </label>
                  <div className="mt-2">
                    <Select
                      className="select-input"
                      placeholder="Select Service User"
                      isClearable
                      options={serviceUserOption}
                      value={
                        serviceValue
                          ? serviceUsers.find((x) => x.value === serviceValue)
                          : serviceValue
                      }
                      onChange={(option) =>
                        serviceOnChange(option ? option.value : option)
                      }
                      {...serviceField}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Team Member
                  </label>
                  <div className="mt-2">
                    <Select
                      className="select-input"
                      placeholder="Select Team Member"
                      isClearable
                      options={teamMembersOption}
                      value={
                        teamValue
                          ? teamMembers.find((x) => x.value === teamValue)
                          : teamValue
                      }
                      onChange={(option) =>
                        teamOnChange(option ? option.value : option)
                      }
                      {...teamField}
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Task List
                  </label>
                  <div className="mt-2">
                    <Select
                      className="select-input"
                      placeholder="Select Team Member"
                      isClearable
                      options={taskListOption}
                      value={
                        taskValue
                          ? taskList.find((x) => x.value === taskValue)
                          : taskValue
                      }
                      onChange={(option) => {
                        const modOpt = option.map((opt) => ({
                          taskName: opt.label,
                          status: opt.status,
                        }));
                        taskOnChange(modOpt);
                      }}
                      {...taskField}
                      isMulti
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="">
                    <input
                      type="hidden"
                      name="company"
                      id="company"
                      placeholder="company"
                      required
                      defaultValue={tokenDetails?.data?._id}
                      className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      {...register("company")}
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="">
                    <input
                      type="hidden"
                      name="status"
                      id="status"
                      placeholder="status"
                      required
                      defaultValue="active"
                      className="block pl-4 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                      {...register("status")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center lg:justify-end gap-x-12 ">
            <button
              type="submit"
              className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Create Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
