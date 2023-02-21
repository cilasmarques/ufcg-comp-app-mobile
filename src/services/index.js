import axios from "axios";

export const BASE_URL = "http://150.165.15.9:8091";
export const ENDPOINT_GUIDE_ACTIVITIES = '/guide/activities';
export const ENDPOINT_AUTH_STUDENT = '/auth/user/student';
export const ENDPOINT_ACTIVITY_REGISTER = '/activity/register';
export const ENDPOINT_ACTIVITY_FIND_BY_STATE = '/activities/find_by_state';
export const ENDPOINT_ACTIVITY_COMPUTE_CREDITS = '/activities/computeCredits';
export const ENDPOINT_ACTIVITY_METRICS = '/activities/metrics';
export const ENDPOINT_PROCESS_GENERATE = '/process/generate';

const API = axios.create({
  baseURL: BASE_URL,
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

// fazer revoke do token
// adicionar uns loading
