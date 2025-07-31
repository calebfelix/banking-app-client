import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { getPassbook } from "../../services/transaction/transactions";
import { MessageError, MessageSuccess } from "../../error/Errors";
import Modal from "react-bootstrap/Modal";
const XLSX = require("xlsx");

const DownloadButton = ({ fromDate, toDate, accountId }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const downloadSend = async () => {
    try {
      setShow((prev) => true);
      let filters = {
        fromDate: fromDate,
        toDate: toDate,
      };
      let response = await getPassbook(accountId, filters);
      if (response?.data) {
        console.log(response.data);
        setData((prev) => response.data);
      }
    } catch (error) {
      MessageError("could not download");
    }
  };

  const handleDownload = () => {
    try {
      console.log("download");
      let timestamp = new Date().getTime();
      const workSheet = XLSX.utils.json_to_sheet(data);
      console.log(">>>>>>>>>>>>>>>>>>>", data);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "data");
      // generate buffer
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      // binary String
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

      XLSX.writeFile(workBook, `${timestamp}.xlsx`);
      MessageSuccess("file Downloaded Successfully");
    } catch (error) {
      MessageError(error.message);
    }
  };

  return (
    <>
      <button
        onClick={downloadSend}
        className=" text-white m-5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Download
      </button>

      <div
        style={{ display: show ? "block" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative top-[25%] translate-x-[-50%] left-[50%] w-full max-w-[30rem] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Download
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="w-[100%] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 md:p-4 dark:bg-gray-700 dark:border-gray-700">
            <p className="text-gray-300 font-semibold">Do You Want to Download this file?</p>
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
                onClick={handleDownload}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                download
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadButton;
