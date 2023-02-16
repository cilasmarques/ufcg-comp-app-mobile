import axios from "axios";
const REACT_APP_API_URI="http://150.165.15.9:8091"

export async function registerUser(data) {
  try {
    return await axios.post(`${REACT_APP_API_URI}/user/register`, data);
  } catch (error) {
    console.error(error);
  }
};

export async function fetchUserByEmail(email) {
  // console.log(email);
  try {
    return await axios.get(`${REACT_APP_API_URI}/user/email/${email}`);
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    }
    console.error(error);
  }
};
