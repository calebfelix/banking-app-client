import React, { useState } from "react";
import { MessageError } from "../../error/Errors";

const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetUsername, setResetUsername] = useState("");

  const handleResetPassword = () => {
    try {
      if (resetEmail.length === 0) {
        MessageError("invalid Email");
        return;
      }
      if (resetUsername.length === 0) {
        MessageError("invalid username");
        return;
      }
      console.log(resetEmail);
    } catch (error) {}
  };

  return (
    <>
      <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
        <div className="card-body">
          <h4 className="card-title mt-2">Reset Password</h4>
          <form>
            <div className="form-group mt-2">
              <label>Email</label>
              <input
                onChange={(e) => {
                  setResetEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                placeholder="jon@doe.com"
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>Username</label>
              <input
                onChange={(e) => {
                  setResetUsername(e.target.value);
                }}
                type="email"
                className="form-control"
                placeholder="user"
              ></input>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
