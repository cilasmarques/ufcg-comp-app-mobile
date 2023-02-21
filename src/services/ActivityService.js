import API, {
  handleErrors,
  ENDPOINT_ACTIVITY_REGISTER,
  ENDPOINT_ACTIVITY_FIND_BY_STATE,
  ENDPOINT_ACTIVITY_COMPUTE_CREDITS,
  ENDPOINT_ACTIVITY_METRICS
} from ".";

export async function registerActivity(activity) {
  try {
    return await API.post(ENDPOINT_ACTIVITY_REGISTER, activity);
  } catch (error) {
    handleErrors(error);
  }
};

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await API.post(`${ENDPOINT_ACTIVITY_FIND_BY_STATE}?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, query);
  } catch (error) {
    handleErrors(error);
  }
};

export async function fetchActivitiesComputedCredits(userEmail) {
  try {
    return await API.get(`${ENDPOINT_ACTIVITY_COMPUTE_CREDITS}/${userEmail}`);
  } catch (error) {
    handleErrors(error);
  }
};

export async function fetchActivitiesMetrics() {
  try {
    return await API.get(ENDPOINT_ACTIVITY_METRICS);
  } catch (error) {
    handleErrors(error);
  }
};
