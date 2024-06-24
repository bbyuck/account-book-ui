import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  haveAccessToken,
  removeJWT,
  saveJWT,
} from "util/authUtil";

import store from "store";
import {
  openErrorAlert,
  loadingStart,
  loadingEnd,
  loadingReady,
  openSuccessAlert,
} from "store/slice/clientInfo";
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
    /**
     * 200ms내로 response 받지 못할시 loading start
     */
    store.dispatch(loadingReady());
    setTimeout(() => store.dispatch(loadingStart()), 200);

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
    store.dispatch(loadingEnd());

    if (config.data.code && config.data.code !== "SUC_USR_002") {
      // 로그아웃 예외
      store.dispatch(openSuccessAlert(config.data.message));
    }
    return config;
  },
  async (err) => {
    store.dispatch(loadingEnd());
    let tokenRefreshed = false;
    const isReissueTokenRequest = err.config.url === "/api/v1/reissue/token";

    if (
      err.response.data &&
      err.response.data.error &&
      err.response.data.code === "ERR_AUTH_005" &&
      !isReissueTokenRequest
    ) {
      /**
       * 토큰 만료 -> refresh token 요청
       */
      const refreshToken = getRefreshToken();
      tokenRefreshed = await api
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
        // console.log("token refreshed");
        return api(err.config);
      }
    }

    if (
      isAuthenticationError(err.response.status) &&
      !tokenRefreshed &&
      !window.location.pathname.endsWith("login")
    ) {
      removeJWT();
      sessionStorage.setItem("logout", true);
      window.location.replace(`${process.env.PUBLIC_URL}/login`);
    }

    store.dispatch(openErrorAlert(err.response.data.message));

    return Promise.reject(err);
  }
);

export default api;
