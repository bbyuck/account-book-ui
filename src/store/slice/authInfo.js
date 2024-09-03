import { createSlice } from "@reduxjs/toolkit";
import { haveAccessToken } from "util/authUtil";

const initialState = {
  loggedIn: haveAccessToken(),
  check: 0,
  tokenReissueTime: null,
};

const authInfoSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {
    resetAuthStore: () => initialState,
    syncAuth(state = initialState) {
      state.loggedIn = haveAccessToken();
      state.check = state.check + 1;
    },
    setTokenReissueTime(state = initialState, action) {
      state.tokenReissueTime = action.payload;
    },
  },
});

export const { syncAuth, resetAuthStore, setTokenReissueTime } =
  authInfoSlice.actions;
export default authInfoSlice.reducer;
