import API, {
  handleErrors,
  ENDPOINT_AUTH_STUDENT
} from ".";

export async function authStudent(authentication) {
  try {
    API.defaults.headers.common["Authorization"] = `${authentication.tokenType} ${authentication.accessToken}`;
    return await API.post(ENDPOINT_AUTH_STUDENT);
  } catch (error) {
    handleErrors(error);
  }
};
