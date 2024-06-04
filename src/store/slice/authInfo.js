import { createSlice } from "@reduxjs/toolkit";
import { haveAccessToken } from "util/authUtil";

const initialState = {
  loggedIn: haveAccessToken(),
};

const authInfoSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {
    syncAuth(state = initialState) {
      state.loggedIn = haveAccessToken();
    },
  },
});

export const { syncAuth } = authInfoSlice.actions;
export default authInfoSlice.reducer;
