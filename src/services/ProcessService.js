import API, {
  handleErrors,
  ENDPOINT_PROCESS_GENERATE
} from ".";

export async function generateProcess(data) {
  try {
    return await API.post(ENDPOINT_PROCESS_GENERATE, data);
  } catch (error) {
    handleErrors(error);
  }
};
