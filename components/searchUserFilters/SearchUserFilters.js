import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const SearchUserFilters = ({
  handelAllUsers,
  setOffset,
  setSearchName,
  setSearchAge,
  setSearchGender,
  setSearchUsername,
  setSearchEmail,
  setSearchIsAdmin,
  searchName,
  searchAge,
  searchGender,
  searchUsername,
  searchEmail,
  searchIsAdmin,
}) => {
  const handleFilters = () => {
    try { 
      setOffset((prev) => 1);
      console.log("first");
      handelAllUsers();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    console.log("hit");
    try {
      setSearchName((prev) => "");
      setSearchAge((prev) => 0);
      setSearchUsername((prev) => "");
      setSearchEmail((prev) => "");
      setSearchIsAdmin((prev) => false);
      setReset((prev) => !prev);
    } catch (error) {}
  };

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (
        searchName !== "" ||
        searchName !== "" ||
        searchAge !== 0 ||
        searchUsername !== "" ||
        searchEmail !== ""
      ) {
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
  }, [searchName, searchName, searchAge, searchUsername, searchEmail]);

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
            <div></div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Age
              </label>
              <input
                value={searchAge}
                onChange={(e) => {
                  setSearchAge(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                type="number"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                value={searchUsername}
                onChange={(e) => {
                  setSearchUsername(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                type="text"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                value={searchEmail}
                onChange={(e) => {
                  setSearchEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                type="text"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                isAdmin
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => {
                  setSearchIsAdmin((prev) => e.target.value);
                }}
              >
                <option value="">select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
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

export default SearchUserFilters;
