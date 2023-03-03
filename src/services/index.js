import axios from "axios";
import { Alert } from "react-native";
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

export const handleErrors = (error, customMessage) => {
  if (error.response) {
    if (error.response.data.message)
      Alert.alert("Ops", error.response.data.message);
    else if (customMessage)
      Alert.alert("Ops", customMessage);
  } else if (error.request) {
    Alert.alert("Ops", "Falha ao se comunicar com o servidor");
  } else {
    Alert.alert("Ops", "Falha ao realizar a operação");
  }
};

export default API;
