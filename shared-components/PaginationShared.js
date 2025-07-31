import { Pagination } from "@mui/material";
import React from "react";

const PaginationShared = ({ limit, offset, count, setOffset }) => {
  const noOfPages = Math.ceil(count / limit);
  return (
    <>
      <Pagination
        count={noOfPages}
        shape="rounded"
        color="primary"
        onChange={(e, p) => {
          setOffset(p);
        }}
      />
    </>
  );
};

export default PaginationShared;
