import axios from "axios";
import { REACT_APP_API_URI } from "@env";

export async function registerActivity(data) {
  try {
    return await axios.post(`${REACT_APP_API_URI}/activity/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchActivities(query, page, rowsPerPage, sort, order) {
  try {
    return await axios.post(
      `${REACT_APP_API_URI}/activities?page=${page}&size=${rowsPerPage}&sort=${sort}&order=${order}`,
      query
    );
  } catch (error) {
    console.log(error);
  }
}

export async function fetchActivitiesComputedCredits(userEmail) {
  try {
    return await axios.get(
      `${REACT_APP_API_URI}/activities/computeCredits/${userEmail}`
    );
  } catch (error) {
    console.log(error);
  }
}

export async function generateProcess(ownerEmail, ownerName, ownerEnroll) {
  try {
    return await axios.post(
      `${REACT_APP_API_URI}/process/generate`,
      {
        owner_email: ownerEmail,
        owner_name: ownerName,
        owner_enroll: ownerEnroll,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
