"use client";
import React, { useEffect, useState } from "react";
import NavbarShared from "../../shared-components/Navbar";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { getAccounts } from "../../services/account/accounts";
import SearchAccountFilters from "../searchAccountFilters/SearchAccountFilters";
import CreateAccount from "../createAccount/CreateAccount";
import {
  deposite,
  transfer,
  withdraw,
} from "../../services/transaction/transactions";
import TransferDropdown from "../transferDropdown/TransferDropdown";
import { getUserNetWorth } from "../../services/user/users";
import { useRouter } from "next/navigation";

const AllAccounts = () => {  
  const router = useRouter();
  const [netWorth, setNetWorth] = useState(0);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [offset, setOffset] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // modals
  const [show, setShow] = useState(false);
  const [showDeposite, setShowDeposite] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  // amounts
  const [depositeAmount, setDepositeAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferToAccount, setTransferToAccount] = useState("");

  // modal states
  const [id, setId] = useState("");
  const [book, setBook] = useState({});

  // userId set
  const [userId, setUserId] = useState("") 

  // search filters
  const [searchBankName, setSearchBankName] = useState("");

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };



  const viewPassbook = (d) => {
    setId(d.id);
    console.log(data);
    setBook(d);
    setShow((prev) => true);
  };

  const getNetWorth = async () => {
    try {
    await setUserId(localStorage.getItem("id"))
      let response = await getUserNetWorth(userId);
      setNetWorth(response.data[0].net_worth);
      // setNetWorth()
    } catch (error) {
      // MessageError(error.message);
    }
  };

  const depositeSend = async (d) => {
    try {
      if (depositeAmount == 0) {
        throw new Error("invalid deposite amount");
      }
      if (depositeAmount > 100000) {
        throw new Error("deposite amount crossing limit");
      }
      let body = { amount: Number(depositeAmount) };

      let response = await deposite(userId, id, body);
      console.log(response);
      if (response.data) {
        MessageSuccess("Amount added");
      }
      handelAllAccounts();
      setShowDeposite((prev) => !prev);
    } catch (error) {
      console.log(error);
      MessageError(error.message);
    }
  };

  const withdrawSend = async (d) => {
    try {
      if (withdrawAmount == 0) {
        throw new Error("invalid withdraw amount");
      }
      let body = { amount: Number(withdrawAmount) };

      let response = await withdraw(userId, id, body);
      console.log(response);
      if (response.data) {
        MessageSuccess("Amount deducted");
      }
      handelAllAccounts();
      setShowWithdraw((prev) => !prev);
    } catch (error) {
      console.log(error);
      MessageError(error.message);
    }
  };

  const transferSend = async (d) => {
    try {
      if (transferToAccount.length == 0) {
        throw new Error("invalid To Account");
      }
      if (transferAmount == 0) {
        throw new Error("invalid Transfer amount");
      }
      if (transferAmount > 100000) {
        throw new Error("transfer amount crossing limit");
      }
      let body = {
        amount: Number(transferAmount),
        recieverAccountId: transferToAccount,
      };

      let response = await transfer(userId, id, body);
      if (response.data) {
        MessageSuccess("Amount sent");
      }
      handelAllAccounts();
      setShowTransfer((prev) => !prev);
    } catch (error) {
      console.log(error);
      MessageError(error.message);
    }
  };

  const handleDeposite = async (d) => {
    try {
      setShowDeposite((prev) => !prev);
      setId(d.id);
      console.log("deposite");
    } catch (error) {
      MessageError(error.message);
    }
  };

  const handleWithdraw = async (d) => {
    try {
      setShowWithdraw((prev) => !prev);
      setId(d.id);
      console.log("withdraw");
    } catch (error) {
      MessageError(error.message);
    }
  };

  const handleTransfer = async (d) => {
    try {
      setShowTransfer((prev) => !prev);
      setId(d.id);
      console.log("transfer");
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handleView = async (d) => {
    try {
      console.log("d>>>>>>>>>>>>>>>>>>>>>>", d);
      router.push(`/passbook/${d.id}`);
    } catch (error) {
      MessageError("could not redirect");
    } finally {
    }
  };

  const handelAllAccounts = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit: limit,
        page: offset,
        bankName: searchBankName,
      };
      let response = await getAccounts(userId, filters);
      console.log(response);
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
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

    getNetWorth();
  }, [handelAllAccounts]);

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handelAllAccounts();
    }
  }, [limit, offset, isVerifiedUser]);

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
      <div style={{ display: "flex" }}>
        <CreateAccount handelAllAccounts={handelAllAccounts} />
        <div className="m-5">
          <div className="flex mt-10">
            <div className="w-full m-2 p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-2 md:p-2 dark:bg-gray-800 dark:border-gray-700">
              <p className="tracking-wider font-semibold text-white md:text-lg dark:text-white">
                Networth : {netWorth}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SearchAccountFilters
        handelAllAccounts={handelAllAccounts}
        setSearchBankName={setSearchBankName}
        searchBankName={searchBankName}
        setOffset={setOffset}
      />
      <Table
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleDeposite={handleDeposite}
        handleWithdraw={handleWithdraw}
        handleTransfer={handleTransfer}
        handleView={handleView}
        isDeposite={true}
        isWithdraw={true}
        isTransfer={true}
        isViewButton={true}
      />
      {/* deposite */}
      <div
        style={{ display: showDeposite ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Deposite
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  setShowDeposite((prev) => !prev);
                }}
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
                    Deposite Amount
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      setDepositeAmount(e.target.value);
                    }}
                  ></input>
                </div>
              </form>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={(e) => {
                  setShowDeposite((prev) => !prev);
                }}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Close
              </button>
              <button
                onClick={depositeSend}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Deposite
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* withdraw */}
      <div
        style={{ display: showWithdraw ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Withdraw
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  setShowWithdraw((prev) => !prev);
                }}
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
                    Withdraw Amount
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      setWithdrawAmount(e.target.value);
                    }}
                  ></input>
                </div>
              </form>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={(e) => {
                  setShowWithdraw((prev) => !prev);
                }}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Close
              </button>
              <button
                onClick={withdrawSend}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* transfer */}
      <div
        style={{ display: showTransfer ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Transfer
              </h3>
              <button
                type="button"
                onClick={(e) => {
                  setShowTransfer((prev) => !prev);
                }}
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
                <TransferDropdown setTransferToAccount={setTransferToAccount} />
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount</label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      setTransferAmount(e.target.value);
                    }}
                  ></input>
                </div>
              </form>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={(e) => {
                  setShowTransfer((prev) => !prev);
                }}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Close
              </button>
              <button
                onClick={transferSend}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        show={showWithdraw}
        onHide={(e) => {
          setShowWithdraw((prev) => !prev);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setWithdrawAmount(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              setShowWithdraw((prev) => !prev);
            }}
          >
            Close
          </Button>
          <Button variant="danger" onClick={withdrawSend}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* <Modal
        show={showTransfer}
        onHide={(e) => {
          setShowTransfer((prev) => !prev);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransferDropdown setTransferToAccount={setTransferToAccount} />
          <div className="form-group mt-2">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setTransferAmount(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              setShowTransfer((prev) => !prev);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={transferSend}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default AllAccounts;
