const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const AUTO_LOGIN_KEY = "autoLogin";

export const isAutoLogin = () => {
  return !localStorage.getItem(AUTO_LOGIN_KEY)
    ? false
    : localStorage.getItem(AUTO_LOGIN_KEY) === "false"
    ? false
    : true;
};

export const haveAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
    ? true
    : false;
};

export const haveRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY) ? true : false;
};

export const getAccessToken = () => {
  if (!haveAccessToken()) return null;

  if (isAutoLogin()) {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } else {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }
};

export const getRefreshToken = () => {
  if (!haveRefreshToken()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveJWT = (jwt) => {
  if (jwt.autoLogin) {
    if (jwt.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, jwt.accessToken);
    }
  } else {
    if (jwt.accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, jwt.accessToken);
    }
  }

  localStorage.setItem(REFRESH_TOKEN_KEY, jwt.refreshToken);
  localStorage.setItem(AUTO_LOGIN_KEY, jwt.autoLogin);
};

export const removeJWT = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);

  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTO_LOGIN_KEY);
};
