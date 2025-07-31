import React, { useEffect, useState } from "react";
import { MessageError } from "../../error/Errors";
import { getOneUser, getUsers } from "../../services/user/users";

const TransferDropdown = ({setTransferToAccount}) => {
  const [users, setUsers] = useState([]);
  const [myUser, setMyUser] = useState("");
  const [accounts, setAccounts] = useState([]);

  const Ulist = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const Alist = accounts.map((account) => {
    return (
      <option key={account.id} value={account.id}>
        {account.id}
      </option>
    );
  });

  const getListUsers = async () => {
    try {
      let response = await getUsers();
      setUsers((prev) => response.data);
    } catch (error) {
      MessageError("could not load data to dropdown");
    }
  };

  const getListAccounts = async () => {
    try {
      let filters = {
        include: "userAccountFilter",
      };
      let response = await getOneUser(filters, myUser);
      console.log(">>>>>>>>>>>>>", response.data[0].account);
      setAccounts((prev) => response.data[0].account);
    } catch (error) {
      MessageError("could not load data to dropdown");
    }
  };

  useEffect(() => {
    getListUsers();
    getListAccounts();
  }, [myUser]);

  return (
    <><div className="form-group mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          User</label>
      <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    style={{ borderRadius: "5px" }}
        onChange={(e) => {
          setMyUser(e.target.value);
        }}
      >
        <option value="">
          select
        </option>
        {Ulist}
      </select>
      </div>
      <div className="form-group mt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        To Account</label>
      <select
      disabled={myUser==""}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      style={{ borderRadius: "5px" }}
        onMouseOver={(e)=>{
            e.preventDefault()
            if(myUser==""){
                MessageError("please select user first")
            }
        }}
        onChange={(e) => {
            setTransferToAccount(e.target.value);
          }}
      >
        <option value="">
          select
        </option>
        {Alist}
      </select>
      </div>
    </>
  );
};

export default TransferDropdown;
