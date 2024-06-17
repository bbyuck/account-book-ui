import { createSlice } from "@reduxjs/toolkit";
import { haveAccessToken } from "util/authUtil";

const initialState = {
  loggedIn: haveAccessToken(),
  check: 0,
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
  },
});

export const { syncAuth, resetAuthStore } = authInfoSlice.actions;
export default authInfoSlice.reducer;
