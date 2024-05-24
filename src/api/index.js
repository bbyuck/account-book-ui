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
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjMsImF1dGgiOiJST0xFX1VTRVIiLCJpc3MiOiJoYXktYWNjb3VudC1ib29rIiwiZXhwIjoxNzE2NjEyNTc2fQ.WsxK3SE4wORjiY4H__OIoYDcdD6Xm-icdVN7SyUhFISE7MA0pP6Ev2Ncu3cMT704Q4Q4OZwZkCGw6GpCrmhiBA";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
