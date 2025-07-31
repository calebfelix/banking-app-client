import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const SearchBankFilters = ({
  handelAllBanks,
  setSearchBankName,
  setSearchAbbrevieation,
  searchBankName,
  searchAbbrevieation,
  setOffset,
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handelAllBanks();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    console.log("hit");
    try {
      setSearchBankName((prev) => "");
      setSearchAbbrevieation((prev) => "");
      setReset((prev) => !prev);
    } catch (error) {}
  };

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (searchBankName !== "" || searchAbbrevieation !== "") {
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
  }, [searchBankName, searchAbbrevieation]);

  useEffect(() => {
    handleFilters();
  }, [reset]);

  return (
    <>
      {" "}
      <div className="flex justify-center mt-10">
        <div className="w-full m-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Search By
          </h5>
          <form className="space-y-6 flex justify-between">
            <div className="flex">
              <div className="mr-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Bank Name
                </label>
                <input
                  value={searchBankName}
                  onChange={(e) => {
                    setSearchBankName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  required
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Abbrevieation
                </label>
                <input
                  value={searchAbbrevieation}
                  onChange={(e) => {
                    setSearchAbbrevieation(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                ></input>
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
    </>
  );
};

export default SearchBankFilters;
