import axios from "axios";

export const deposite = async (userId, accountId, body) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/transaction/deposit/${userId}/${accountId}`,
    body,
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );
  console.log(response);
  return response;
};

export const transfer = async (userId, accountId, body) => {
  console.log(accountId)
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/transaction/transfer/${userId}/${accountId}`,
    body,
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );
  console.log(response);
  return response;
};

export const withdraw = async (userId, accountId, body) => {
    const response = await axios.put(
      `http://127.0.0.1:20200/api/v1/transaction/withdraw/${userId}/${accountId}`,
      body,
      {
        headers: { auth: localStorage.getItem("auth") },
      },
    );
    console.log(response);
    return response;
  };


  export const getPassbook = async (accountId, filters) => {
    console.log(filters)
    const response = await axios.get(
      `http://127.0.0.1:20200/api/v1/transaction/passbook/${accountId}`,
      {
        headers: { auth: localStorage.getItem("auth") },
        params: filters,
      }
    );
    console.log(response);
    return response;
  };
