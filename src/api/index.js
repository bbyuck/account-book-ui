import axios from "axios";
import { getAccessToken } from "util/authUtil";

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
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (config) => {},
  (err) => {
    debugger;
    return Promise.reject(err);
  }
);

export default api;
