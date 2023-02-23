import API, { handleErrors } from ".";
import { API_ENDPOINT_PROCESS_GENERATE } from "../utils/constants";

export async function generateProcess(data) {
  try {
    return await API.post(API_ENDPOINT_PROCESS_GENERATE, data);
  } catch (error) {
    handleErrors(error);
  }
};
