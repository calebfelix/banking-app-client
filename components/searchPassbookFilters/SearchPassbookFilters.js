import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchPassbookFilters = ({
  handlePassbook,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
  setOffset,
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handlePassbook();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    console.log("hit");
    try {
      setFromDate((prev) => new Date("2000/01/01"));
      setToDate((prev) => new Date());
      setReset((prev) => !prev);
    } catch (error) {}
  };

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (toDate !== "" || fromDate !== "") {
        setDisable((prev) => false);
        return;
      }
      setDisable((prev) => true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    disableHandle();
  }, [toDate, fromDate]);

  useEffect(() => {
    handleFilters();
  }, [reset]);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="w-full m-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Search By
          </h5>
          <form className="space-y-6 flex justify-between">
            <div className="flex">
              <div className="mr-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  From date
                </label>
                <DatePicker
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  dateFormat="yyyy/MM/dd"
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  To date
                </label>
                <DatePicker
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  dateFormat="yyyy/MM/dd"
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleFilters}
                type="button"
                className="px-3 py-2 m-1 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
              <button
                onClick={resetFilters}
                type="button"
                className="px-3 py-2 m-1 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Search By</h4>
          <form
            className="form-inline"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group mt-2">
                <label>From date</label>&nbsp;&nbsp;
                <DatePicker
                dateFormat='yyyy/MM/dd'
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                />
                &nbsp;&nbsp;
              </div>
              <div className="form-group mt-2">
                <label>To date</label>&nbsp;&nbsp;
                <DatePicker
                dateFormat='yyyy/MM/dd'
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                />
                &nbsp;&nbsp;
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group mt-2">
                <Button
                  variant="primary"
                  disabled={disable}
                  onClick={handleFilters}
                >
                  Search
                </Button>
              </div>
              &nbsp;&nbsp;
              <div className="form-group mt-2">
                <Button variant="primary" onClick={resetFilters}>
                  reset filter
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default SearchPassbookFilters;
