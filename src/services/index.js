import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export const setAuthToken = token => {
  if (token) {
    API.defaults.headers.common["Authorization"] = 'Bearer ' + token;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const handleErrors = error => {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
};

export default API;
