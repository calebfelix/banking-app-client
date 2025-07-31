// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
import { logout } from "../services/user/logout";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { resetPassword } from "../services/user/users";
import { MessageError, MessageSuccess } from "../error/Errors";
import { useRouter } from "next/navigation";

const NavbarShared = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleClose = () => {
    setCurrentPassword((prev) => "");
    setNewPassword((prev) => "");
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const resetPasswordSender = async (e) => {
    try {
      if (currentPassword.length == 0) {
        throw new Error("invalid current Password");
      }
      if (newPassword.length == 0) {
        throw new Error("invalid new Password");
      }

      let sendObj = { currentPassword, newPassword, username: username };
      console.log(sendObj);
      let response = await resetPassword(sendObj);
      if (response.data === "updated password") {
        MessageSuccess(response.data);
        handleClose();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data?.message == "authentication failed") {
          MessageError("Incorrect Current Password");
          return;
        }
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      handleShow();
    } catch (error) {
      MessageError(error.message);
    }
  };

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      let response = await logout();
      localStorage.clear();
      router.push(`/login`);
    } catch (error) {
      console.log(error);
      console.log(error);
      if (error.response) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };
  if (!username) {
    return (
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav
          className="max-w-[85rem] flex justify-center w-full mx-auto px-4 sm:flex sm:items-center sm:justify-center"
          aria-label="Global"
        >
          <a
            className="flex text-xl font-semibold dark:text-white justify-center"
            href="#"
          >
            Banking App
          </a>
        </nav>
      </header>
    );
  }

  return (
    <>
      <div
        style={{ display: show ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Reset Password
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
                    Current Password
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    New Password
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  ></input>
                </div>
              </form>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleClose}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Close
              </button>
              <button
                onClick={resetPasswordSender}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav
          className="w-full px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <a className="flex text-md dark:text-white" href="#">
            Hello! {username}
          </a>
          <a className="flex text-xl font-semibold dark:text-white" href="#">
            Banking App
          </a>
          <div>
            <button
              className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              style={{ marginRight: "20px" }}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              type="button"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavbarShared;
