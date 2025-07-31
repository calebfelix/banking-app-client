"use client";
import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../../services/user/users";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import NavbarShared from "../../shared-components/Navbar";
import CreateUser from "../createUser/CreateUser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import SearchUserFilters from "../searchUserFilters/SearchUserFilters";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { useRouter } from "next/navigation";

const AllUsers = () => {
  // user states
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // modal states
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  // User search filters
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState(0);
  const [searchGender, setSearchGender] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchIsAdmin, setSearchIsAdmin] = useState(false);

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const addBankHandle = () => {
    router.push("/allbanks");
  };

  const updateSender = async (e) => {
    try {
      if (name.length == 0) {
        throw new Error("invalid name");
      }
      if (age.length == 0) {
        throw new Error("invalid age");
      }
      console.log(gender);
      if (gender.length == 0) {
        throw new Error("invalid gender");
      }
      if (email.length == 0) {
        throw new Error("invalid email");
      }

      let bodyObj = { name, age, gender, email };
      console.log(bodyObj)
      let response = await updateUser(id, bodyObj);
      console.log(response.data);
      if (response.data === "user Updated") {
        MessageSuccess(response.data);
        handleClose();
        handelAllUsers();
      }
    } catch (error) {
      if (error.response) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };

  const handleDelete = async (d) => {
    try {
      let response = await deleteUser(d.id);
      if (response.data === "user Deleted") {
        MessageSuccess(response.data);
        handelAllUsers();
      }
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handelAllUsers = async () => {
    try {
      console.log("handelAllUsers");
      setIsLoading((prev) => true);
      console.log(offset);
      let filters;
      if (searchAge == 0) {
        filters = {
          limit: limit,
          page: offset,
          name: searchName,
          username: searchUsername,
          isAdmin: searchIsAdmin,
          email: searchEmail,
        };
      } else {
        filters = {
          limit: limit,
          page: offset,
          name: searchName,
          age: searchAge,
          username: searchUsername,
          isAdmin: searchIsAdmin,
          email: searchEmail,
        };
      }

      let response = await getUsers(filters);
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      console.log(error);
      MessageError(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => false);
    }
  };

  const verifyUser = async () => {
    try {
      let response = await verify();
      setIsVerifiedUser((prev) => response.data.result);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handelAllUsers();
    }
  }, [limit, offset, isVerifiedUser]);

  const handleUpdate = (d) => {
    try {
      setName(d.name);
      setAge(d.age);
      setEmail(d.email);
      setId(d.id);
      setGender(d.gender);
      setShow((prev) => true);
    } catch (error) {
      MessageError("couldnt set values");
    }
  };

  if (!isVerifiedUser) {
    return (
      <h1>
        <a href="/">please login</a>
      </h1>
    );
  }
  return (
    <>
      <Spinner isLoading={isLoading} />
      <NavbarShared />
      <CreateUser handelAllUsers={handelAllUsers} />
      <div>
        <button
          className="m-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={addBankHandle}
        >
          + Add Bank
        </button>
      </div>
      <SearchUserFilters
        handelAllUsers={handelAllUsers}
        setSearchName={setSearchName}
        setSearchAge={setSearchAge}
        setSearchGender={setSearchGender}
        setSearchUsername={setSearchUsername}
        setSearchEmail={setSearchEmail}
        setSearchIsAdmin={setSearchIsAdmin}
        searchName={searchName}
        searchAge={searchAge}
        searchGender={searchGender}
        searchUsername={searchUsername}
        searchEmail={searchEmail}
        searchIsAdmin={searchIsAdmin}
        setOffset={setOffset}
      />

      <Table
        rows={data}
        setOffset={setOffset}
        setGender
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        isUpdateButton={true}
        isDeleteButton={true}
        isViewButton={false}
      />

      <div
        style={{ display: show ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update User
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="w-[100%] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 md:p-4 dark:bg-gray-700 dark:border-gray-700">
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Age
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Gender
                  </label>
                  <select
                  value={gender}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      setGender((prev) => e.target.value);
                    }}
                  >
                    <option value="">
                      select
                    </option>
                    <option value="male">
                      male
                    </option>
                    <option value="female">
                      female
                    </option>
                    <option value="others">
                      others
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </form>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={handleClose}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={updateSender}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
