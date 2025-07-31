import React from "react";
import "./Spinner.css";

const Spinner = ({ isLoading }) => {
  return (
    <>
      {/* <div className="main-loader-container" style={{ display: isLoading ? "block" : "none" }}> */}
        <div className="loader"style={{ display: isLoading ? "block" : "none" }}>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
      </div>
    </>
  );
};

export default Spinner;
