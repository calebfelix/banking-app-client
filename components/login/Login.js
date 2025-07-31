"use client";
import React, { useEffect, useState } from "react";
import { login as userLogin } from "../../services/user/authorization.js";
import NavbarShared from "../../shared-components/Navbar.js";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError } from "../../error/Errors.js";
import { useRouter } from "next/navigation.js";

const Login = () => {
  const router = useRouter();

  const handleForgotPassword = () => {
    try {
      router.push("/forgotpassword");
    } catch (error) {
      MessageError(error.message);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMyLogin = async (e) => {
    try {
      setIsLoading((prev) => true);
      e.preventDefault();
      if (username.length === 0) {
        MessageError("invalid username");
        return;
      }
      if (password.length === 0) {
        MessageError("invalid password");
        return;
      }
      const response = await userLogin(username, password);
      console.log(response);
      localStorage.setItem("auth", response.headers.auth);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);
      if (response.data.isAdmin) {
        localStorage.setItem("isAdmin", 1);
      } else {
        localStorage.setItem("isAdmin", 0);
      }
      if (!response?.data.id) {
        MessageError("invalid credentials");
        return;
      }
      if (response.data.isAdmin) {
        router.push(`/allusers/`);
        return;
      }
      router.push(`/allaccounts/`);
      return;
    } catch (error) {
      if (error.response) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }

      return;
    } finally {
      setIsLoading((prev) => false);
    }
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <NavbarShared />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Login
            </h5>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                type="text"
                placeholder="Username"
              ></input>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            {/* <div className="flex items-start">
              <a
                href="#"
                className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </a>
            </div> */}
            <button
              type="button"
              onClick={handleMyLogin}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
