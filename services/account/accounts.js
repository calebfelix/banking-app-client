import axios from "axios";

export const getAccounts = async (userId, searchFilters) => {
  console.log(searchFilters);
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/user/${userId}/account`, {
    headers: { auth: localStorage.getItem("auth") },
    params: searchFilters,
  });
  console.log(response);
  return response;
};

export const createAccount = async (userId,body) => {
  const response = await axios.post(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account`,
    body,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

// export const updateBank = async (bankId, body) => {
//   const response = await axios.put(
//     `http://127.0.0.1:20200/api/v1/bank/${bankId}`,
//     body,
//     { headers: { auth: localStorage.getItem("auth") } }
//   );
//   return response;
// };
