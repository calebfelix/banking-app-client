import axios from "axios";

export const getBanks = async (searchFilters) => {
  console.log(searchFilters);
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/bank`, {
    headers: { auth: localStorage.getItem("auth") },
    params: searchFilters,
  });
  console.log(response);
  return response;
};

export const createBank = async (bankName) => {
  const response = await axios.post(
    `http://127.0.0.1:20200/api/v1/bank/create`,
    { bankName },
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const updateBank = async (bankId, body) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/bank/${bankId}`,
    body,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

// export const deleteUser = async (userId) => {
//   const response = await axios.delete(
//     `http://127.0.0.1:20200/api/v1/user/${userId}`,
//     { headers: { auth: localStorage.getItem("auth") } }
//   );
//   return response;
// };
