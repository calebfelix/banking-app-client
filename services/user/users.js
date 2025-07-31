import axios from "axios";

export const getUsers = async (searchFilters) => {
  console.log(searchFilters);
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/user`, {
    headers: { auth: localStorage.getItem("auth") },
    params: searchFilters,
  });
  console.log(response);
  return response;
};

export const getOneUser = async (searchFilters, userId) => {
  console.log(searchFilters);
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/user/${userId}`, {
    headers: { auth: localStorage.getItem("auth") },
    params: searchFilters,
  });
  return response;
};

export const getUserNetWorth = async (userId) => {
  const response = await axios.get(`http://127.0.0.1:20200/api/v1/user/${userId}/networth`, {
    headers: { auth: localStorage.getItem("auth") },
  });
  return response;
};

export const createUser = async (
  name,
  age,
  gender,
  email,
  username,
  password
) => {
  const response = await axios.post(
    `http://127.0.0.1:20200/api/v1/user/create`,
    { name, age, gender, email, username, password },
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const updateUser = async (userId, body) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${userId}`,
    body,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  console.log(response)
  return response;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(
    `http://127.0.0.1:20200/api/v1/user/${userId}`,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};

export const resetPassword = async (body) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/resetpassword`,
    body,
    { headers: { auth: localStorage.getItem("auth") } }
  );
  return response;
};
