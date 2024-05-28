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
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjMsImF1dGgiOiJST0xFX1VTRVIiLCJpc3MiOiJoYXktYWNjb3VudC1ib29rIiwiZXhwIjoxNzE2OTkyMDE5fQ.mpnFtHWE9JD-ZBI0Ebi9x6wSj2S0_1DUI6lr0PHGa03Z-sMEnKQPs9GBu6NZUIJ5txhsvOO4c4vtVpL7_8iikA";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
