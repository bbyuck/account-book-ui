import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // config.headers[Authorization] = getTokenFromSession();
    config.headers.Authorization =
      "Bearer " +
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjMsImF1dGgiOiJST0xFX1VTRVIiLCJpc3MiOiJoYXktYWNjb3VudC1ib29rIiwiZXhwIjoxNzE2ODU3MDg2fQ.7SXMc2e7MIuNMI_1XunLIR5gJtot1wt_JjwbmnJcG0ZlT5c12-YTw8g0UkZEI01tnr_xm4y5apKFJ2gN-IUJKw";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
