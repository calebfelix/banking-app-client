"use client"
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import NavbarShared from "../../shared-components/Navbar";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { getPassbook } from "../../services/transaction/transactions";
import SearchPassbookFilters from "../searchPassbookFilters/SearchPassbookFilters";
import DownloadButton from "../downloadButton/DownloadButton";

const Passbook = ({accountId}) => {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [offset, setOffset] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // search filters
  const [fromDate, setFromDate] = useState(new Date("2000/01/01"));
  const [toDate, setToDate] = useState(new Date());

  // let { accountId } = useParams();

  const handlePassbook = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit: limit,
        page: offset,
        fromDate: fromDate,
        toDate: toDate,
      };
      let response = await getPassbook(accountId, filters);

      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
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
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handlePassbook();
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
      <SearchPassbookFilters
        handlePassbook={handlePassbook}
        setFromDate={setFromDate}
        setToDate={setToDate}
        fromDate={fromDate}
        toDate={toDate}
        setOffset={setOffset}
      />
      <DownloadButton
        toDate={toDate}
        fromDate={fromDate}
        accountId={accountId}
      />
      <Table
        hasNoButtons={true}
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
      />
    </>
  );
};

export default Passbook;
