"use client";
import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../../services/user/users";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import NavbarShared from "../../shared-components/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import CreateBank from "../createBank/CreateBank";
import SearchBankFilters from "../searchBankFilters/SearchBankFilters";
import { getBanks, updateBank } from "../../services/bank/banks";
import { useRouter } from "next/navigation";

const AllBanks = () => {
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
  const [bankName, setBankName] = useState("");
  const [id, setId] = useState("");

  // bank search filters
  const [searchBankName, setSearchBankName] = useState("");
  const [searchAbbrevieation, setSearchAbbrevieation] = useState("");

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const goBack = () => {
    router.back();
  };

  const updateSender = async (e) => {
    try {
      if (bankName.length == 0) {
        throw new Error("invalid Bank name");
      }

      let bodyObj = { bankName };
      let response = await updateBank(id, bodyObj);
      if (response.data === "updated bank") {
        MessageSuccess(response.data);
        handleClose();
        handelAllBanks();
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
        handelAllBanks();
      }
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handelAllBanks = async () => {
    try {
      console.log("handelAllBanks");
      setIsLoading((prev) => true);
      console.log(offset);
      let filters;
      filters = {
        limit: limit,
        page: offset,
        bankName: searchBankName,
        abbrevieation: searchAbbrevieation,
      };

      let response = await getBanks(filters);
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
      handelAllBanks();
    }
  }, [limit, offset, isVerifiedUser]);

  const handleUpdate = (d) => {
    try {
      setBankName(d.bankName);
      setId(d.id);
      console.log(d.id);
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
      <CreateBank handelAllBanks={handelAllBanks} />
      <div>
        <button
          className="m-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={goBack}
        >
          Back
        </button>
      </div>
      <SearchBankFilters
        handelAllBanks={handelAllBanks}
        setSearchBankName={setSearchBankName}
        setSearchAbbrevieation={setSearchAbbrevieation}
        searchBankName={searchBankName}
        searchAbbrevieation={searchAbbrevieation}
        setOffset={setOffset}
      />
      <Table
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleUpdate={handleUpdate}
        isUpdateButton={true}
      />
      <div
        style={{ display: show ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update Bank
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
                <div className="form-group mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bank Name</label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={bankName}
                    onChange={(e) => {
                      setBankName(e.target.value);
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

export default AllBanks;
