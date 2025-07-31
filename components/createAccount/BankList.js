import React, { useEffect, useState } from "react";
import { getBanks } from "../../services/bank/banks";
import { MessageError } from "../../error/Errors";

const BankList = ({ setBankId }) => {
  const [banks, setBanks] = useState([]);

  const Blist = banks.map((bank) => {
    return (
      <option key={bank.id} value={bank.id}>
        {bank.bankName}
      </option>
    );
  });

  const getListBanks = async () => {
    try {
      let response = await getBanks();
      setBanks((prev) => response.data);
      console.log(">>>>>>>>>>>>", banks);
    } catch (error) {
      MessageError("could not load data to dropdown");
    }
  };

  useEffect(() => {
    getListBanks();
  }, []);
  return (
    <>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        style={{ borderRadius: "5px" }}
        onChange={(e) => {
          setBankId(e.target.value);
        }}
      >
        <option value="">
          select
        </option>
        {Blist}
      </select>
    </>
  );
};

export default BankList;
