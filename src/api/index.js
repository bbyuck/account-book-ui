import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  haveAccessToken,
  haveRefreshToken,
  removeJWT,
  saveJWT,
} from "util/authUtil";

import store from "store";
import { openSuccessAlert, openErrorAlert } from "store/slice/clientInfo";
import { syncAuth } from "store/slice/authInfo";

const isAuthenticationError = (status) => {
  return status === 401 || status === 403;
};

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
    if (haveAccessToken()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    if (
      err.response.data &&
      err.response.data.error &&
      err.response.data.code === "ERR_AUTH_005"
    ) {
      /**
       * 토큰 만료 -> refresh token 요청
       */
      const refreshToken = getRefreshToken();
      console.log(refreshToken);
      const tokenRefreshed = await api
        .post("/api/v1/reissue/token", null, {
          headers: {
            "Refresh-Token": refreshToken,
          },
        })
        .then((response) => {
          saveJWT(response.data.data);
          return true;
        })
        .catch((refreshError) => {
          console.log(refreshError);
          return false;
        });

      if (tokenRefreshed) {
        console.log("token refreshed");
        return api(err.config);
      }
    }
    if (isAuthenticationError(err.response.status)) {
      removeJWT();
      store.dispatch(syncAuth());
    }

    store.dispatch(openErrorAlert(err.response.data.message));

    return Promise.reject(err);
  }
);

export default api;
