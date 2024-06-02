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
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjMsImF1dGgiOiJST0xFX1VTRVIiLCJpc3MiOiJoYXktYWNjb3VudC1ib29rIiwiZXhwIjoxNzE3MzkzNzMwfQ.mWq1Zo9yIIrXN2YbplJPv-O9bxI2TndrpQXsF4kkgI7lX8gqH1RhQVeeNRSJrJkvZbdCQANjSxkeWnsW-RrRcg";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
