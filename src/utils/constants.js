// OAUTH
export const REACT_APP_GOOGLE_EXPO_CLIENT_ID="0000000-xxxxxxx.apps.googleusercontent.com";
export const REACT_APP_GOOGLE_ANDROID_CLIENT_ID="0000000-xxxxxxx.apps.googleusercontent.com";

// API
API_BASE_URL="http://10.0.2.2:8091"
export const API_ENDPOINT_GUIDE_ACTIVITIES = '/guide/activities';
export const API_ENDPOINT_AUTH_STUDENT = '/auth/user/student';
export const API_ENDPOINT_ACTIVITY_REGISTER = '/activity/register';
export const API_ENDPOINT_ACTIVITY_FIND_BY_STATE = '/activities/find_by_state';
export const API_ENDPOINT_ACTIVITY_COMPUTE_CREDITS = '/activities/computeCredits';
export const API_ENDPOINT_ACTIVITY_METRICS = '/activities/metrics';
export const API_ENDPOINT_PROCESS_GENERATE = '/process/generate';

// ACTIVITY
export const ACTIVITY_UNITY_EVENT = ["-"];
export const ACTIVITY_UNITY_SEMESTER = ["semestre(s)"];
export const ACTIVITY_UNITY_RUNNING_TIME = ["hora(s)"];
export const ACTIVITY_UNITY_CALENDAR = ["meses", "ano(s)"];

export const ACTIVITY_STATE_APPROVED = "APPROVED";
export const ACTIVITY_STATE_REJECTED = "REJECTED";
export const ACTIVITY_STATE_CREATED = "CREATED";
export const ACTIVITY_STATE_ASSIGNED = "ASSIGNED";
export const ACTIVITY_STATE_TRANSLATION_MAP = [
  { key: ACTIVITY_STATE_CREATED, value: "CRIADO" },
  { key: ACTIVITY_STATE_ASSIGNED, value: "ATRIBUÍDO" },
  { key: ACTIVITY_STATE_APPROVED, value: "APROVADO" },
  { key: ACTIVITY_STATE_REJECTED, value: "REJEITADO" }
];
