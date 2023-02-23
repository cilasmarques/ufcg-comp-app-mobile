import API, { handleErrors } from ".";
import { API_ENDPOINT_AUTH_STUDENT } from "../utils/constants";

export async function authStudent(authentication) {
  try {
    API.defaults.headers.common["Authorization"] = `${authentication.tokenType} ${authentication.accessToken}`;
    return await API.post(API_ENDPOINT_AUTH_STUDENT);
  } catch (error) {
    handleErrors(error);
  }
};
