"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { userContext } from "../../../context/MainContext";
import moment from "moment";
import { toast } from "react-toastify";

const Page = () => {
  const { register, handleSubmit } = useForm();
  const [payDate, setPayDate] = useState();
  const { token, tokenDetails } = useContext(userContext);
  const [forceRerender, setForceRerender] = useState(false);
  const fetchData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/payday/?company=${tokenDetails?.data?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        // handle success
        setPayDate(response?.data?.data);
      });
  };

  const onsubmit = (data) => {
    const { nextpayday } = data;
    const formatDate = moment(nextpayday).format("L");
    const modifyData = { ...data, nextpayday: formatDate };

    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/payday/${payDate?.data[0]?._id}`,
          modifyData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function ({ status }) {
          // handle success
          if (status === 200) {
            toast.success("Pay Date Update Successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            setForceRerender(!forceRerender);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [forceRerender]);
  const dateShow = payDate?.data[0]?.nextpayday;
  const formatPayDate = moment(dateShow).format("LL");
  // const formatPayDate = { nextpayday: formatDate };
  return (
    <div>
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-4 content-none  mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden  ">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                  <div>
                    {payDate?.data?.length > 0 ? (
                      <h2 className="text-2xl font-semibold text-gray-800 ">
                        Next Pay Day - {formatPayDate}
                      </h2>
                    ) : (
                      <h2 className="text-2xl font-semibold text-gray-800 ">
                        Next Pay Day - No Date Selected
                      </h2>
                    )}
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2"></div>
                  </div>
                </div>
                <div className="py-12 px-12 ">
                  {payDate?.data?.length < 0 ? (
                    <form
                      onSubmit={handleSubmit(onsubmit)}
                      className="flex flex-col"
                    >
                      <input
                        className="border rounded-md py-1.5 px-3 w-4/12 mb-8"
                        type="date"
                        {...register("nextpayday")}
                      ></input>
                      <div>
                        <button
                          type="submit"
                          className="py-3 px-8  justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                          Create Pay Date
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onsubmit)}
                      className="flex flex-col"
                    >
                      <input
                        className="border rounded-md py-1.5 px-3 w-4/12 mb-8"
                        type="date"
                        defaultValue={formatPayDate}
                        {...register("nextpayday")}
                      ></input>
                      <div>
                        <button
                          type="submit"
                          className="py-3 px-8  justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-[#fff] hover:bg-[#f98808c0] focus:outline-none focus:ring-2 focus:ring-[#F98708] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
