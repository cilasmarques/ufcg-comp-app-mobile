import axios from "axios";
const REACT_APP_API_URI="http://150.165.15.9:8091"

export async function registerActivity(activity) {
  try {
    return await axios.post(`${REACT_APP_API_URI}/activity/register`, activity, 
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  } catch (error) {
    //TODO colocar isso em outros lugares
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
  }
}

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await axios.post(
      `${REACT_APP_API_URI}/activities/find_by_state?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`, query
    );
  } catch (error) {
    if (error.response.status === 404) {
      return null;
    } else {
      console.error(error);
    }
  }
}

export async function fetchActivitiesComputedCredits(userEmail) {
  try {
    return await axios.get(
      `${REACT_APP_API_URI}/activities/computeCredits/${userEmail}`
    );
  } catch (error) {
    console.error(error);
  }
}

export async function fetchActivitiesMetrics() {
  try {
    return await axios.get(
      `${REACT_APP_API_URI}/activities/metrics`
    );
  } catch (error) {
    console.error(error);
  }
}


export async function generateProcess(data) {
  try {
    return await axios.post(
      `${REACT_APP_API_URI}/process/generate`, data);
  } catch (error) {
    console.error(error);
  }
}
