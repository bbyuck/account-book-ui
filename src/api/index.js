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
import { TokenReissueMutex } from "api/mutex";

const mutex = new TokenReissueMutex();
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
    const isReissueTokenRequest = err.config.url === "/api/v1/reissue/token";

    if (isAuthenticationError(err.response.status)) {
      if (err.response.data.code === "ERR_AUTH_005") {
        if (isReissueTokenRequest) {
          logout();
          return;
        }
        /**
         * 토큰 만료 -> refresh token 요청
         */
        return reissueToken(err).then(() => {
          return api.request(err.config);
        });
      }
    } else {
      store.dispatch(openErrorAlert(err.response.data.message));
    }

    return Promise.reject(err);
  }
);

const reissueToken = (err) => {
  return new Promise((resolve, reject) => {
    mutex
      .acquire()
      .then(() => {
        // const tokenReissueTime = sessionStorage.getItem("tokenReissueTime");

        const state = store.getState();
        const { tokenReissueTime } = state.authInfo;

        const now = Date.now();
        const twentyMinutes = 20 * 60 * 1000;

        if (
          mutex.tokenReissueSuccess ||
          // token이 현재 session에서 reissue 된 적 있으며, reissue된 지 20분 이내일 경우 reissue를 하지 않음.
          (tokenReissueTime && now - tokenReissueTime <= twentyMinutes)
        ) {
          mutex.release();
          resolve();
        } else {
          const refreshToken = getRefreshToken();
          api
            .post("/api/v1/reissue/token", null, {
              headers: {
                "Refresh-Token": refreshToken,
              },
            })
            .then((response) => {
              mutex.success();
              mutex.release();
              saveJWT(response.data.data);
              resolve();
            })
            .catch((refreshError) => {
              mutex.clear();
              logout();
              reject(refreshError);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const logout = () => {
  removeJWT();
  sessionStorage.setItem("logout", true);
  window.location.replace(`${process.env.PUBLIC_URL}/login`);
};

export default api;
