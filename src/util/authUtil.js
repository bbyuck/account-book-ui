const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const AUTO_LOGIN_KEY = "autoLogin";

export const isAutoLogin = () => {
  return localStorage.getItem(AUTO_LOGIN_KEY) ? true : false;
};

export const haveAccessToken = () => {
  if (isAutoLogin()) {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ? true : false;
  } else {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) ? true : false;
  }
};

export const haveRefreshToken = () => {
  if (isAutoLogin()) {
    return localStorage.getItem(REFRESH_TOKEN_KEY) ? true : false;
  } else {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) ? true : false;
  }
};

export const getAccessToken = () => {
  return haveAccessToken() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
};

export const getRefreshToken = () => {
  return haveRefreshToken() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
};

export const saveJWT = (jwt) => {
  if (jwt.autoLogin) {
    if (jwt.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, jwt.accessToken);
    }
    if (jwt.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, jwt.refreshToken);
    }
  } else {
    if (jwt.accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, jwt.accessToken);
    }
    if (jwt.refreshToken) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, jwt.refreshToken);
    }
  }

  localStorage.setItem(AUTO_LOGIN_KEY, jwt.autoLogin);
};
