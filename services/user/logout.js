import axios from "axios";

export const logout = async () => {
  const response = await axios.post(`http://127.0.0.1:20200/api/v1/logout`);
  return response;
};
