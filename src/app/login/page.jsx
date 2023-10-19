"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { toast } from "react-toastify";
import { userContext } from "../../context/MainContext";
const jwt = require("jsonwebtoken");

const page = () => {
  const router = useRouter();
  const { tokenDetails, token, setToken, setTokenDetails } =
    useContext(userContext);
  var tokenDecoded = jwt.decode(token);
  const role = tokenDecoded?.data?.role;
  if (role == "admin") {
    toast.success("Admin Logged In", {
      position: toast.POSITION.TOP_CENTER,
    });
    return router.push("/admin");
  } else if (role == "company") {
    toast.success("Login Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    return router.push("/company") && setTokenDetails;
  }
  // else if (tokenDetails?.role == '') {
  //     toast.error('Company LogIn Successfully', {
  //         position: toast.POSITION.TOP_CENTER
  //       });
  //     return router.push('/')
  // }

  const { register, handleSubmit, reset } = useForm();
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const onsubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data)

      .then(({ data }) => {
        if (!data.success) {
          var decoded = jwt.decode(data?.data?.token);
          // toast.success('LogIn SuccessFully');
          localStorage.setItem("timertoken", data?.data?.token);
          localStorage.setItem("details", JSON.stringify(decoded));
          setTokenDetails(decoded);
          setToken(data?.data?.token);
        }
      })
      .catch((error) => {
        toast.error("Something went Wrong");
      });
  };
  return (
    <div>
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-6
         lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Care Timer {process.env.NEXT_PUBLIC_DB_NAME}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 px-4 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              {/* <div className="mt-2">
                                <input
                                type={passwordType} onChange={handlePasswordChange} value={passwordInput}
                                    id="password"
                                    name="password"

                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                    {...register('password')}
                                />
                            </div> */}
              <div className="input-group my-4 relative">
                <input
                  type={passwordType}
                  {...register("password")}
                  name="password"
                  className="form-control block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
                <div className="input-group-btn absolute right-4 top-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? <BiSolidHide /> : <BiShow />}
                  </button>
                </div>
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
                type="submit"
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
