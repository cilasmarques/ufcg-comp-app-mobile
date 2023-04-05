import API, { handleErrors } from ".";
import {
  API_ENDPOINT_ACTIVITY_REGISTER,
  API_ENDPOINT_ACTIVITY_FIND_BY_OWNER_STATE,
  API_ENDPOINT_ACTIVITY_COMPUTE_CREDITS,
  API_ENDPOINT_ACTIVITY_METRICS
} from "../utils/constants";

export async function registerActivity(activity) {
  try {
    return await API.post(API_ENDPOINT_ACTIVITY_REGISTER, activity);
  } catch (error) {
    handleErrors(error);
  }
};

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await API.post(`${API_ENDPOINT_ACTIVITY_FIND_BY_OWNER_STATE}?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, query);
  } catch (error) {
    handleErrors(error);
  }
};

export async function fetchActivitiesComputedCredits(userEmail) {
  try {
    return await API.get(`${API_ENDPOINT_ACTIVITY_COMPUTE_CREDITS}/${userEmail}`);
  } catch (error) {
    handleErrors(error);
  }
};

export async function fetchActivitiesMetrics() {
  try {
    return await API.get(API_ENDPOINT_ACTIVITY_METRICS);
  } catch (error) {
    handleErrors(error);
  }
};
