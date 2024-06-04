import { createSlice } from "@reduxjs/toolkit";
import { haveAccessToken } from "util/authUtil";

const initialState = {
  loggedIn: haveAccessToken(),
};

const authInfoSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {},
});

export const { setPageTransition } = authInfoSlice.actions;
export default authInfoSlice.reducer;
