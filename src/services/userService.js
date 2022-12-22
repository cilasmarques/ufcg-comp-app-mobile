import axios from "axios";
import { REACT_APP_API_URI } from "@env";

export async function registerUser(data) {
  try {
    return await axios.post(`${REACT_APP_API_URI}/user/register`, data);
  } catch (error) {
    console.log(error);
  }
};

export async function fetchUser(query) {
  try {
    return await axios.post(`${REACT_APP_API_URI}/users`, query);
  } catch (error) {
    console.log(error);
  }
};

export async function fetchUserByEmail(email) {
  try {
    return await axios.get(`${REACT_APP_API_URI}/user/${email}`);
  } catch (error) {
    console.log(error);
  }
};
