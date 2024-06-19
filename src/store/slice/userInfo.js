import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupleStatus: null,
  userCoupleStatus: null,
  customColor: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    resetUserStore: () => initialState,
    setCoupleStatus(state = initialState, payload) {
      state.coupleStatus = payload.coupleStatus;
      state.userCoupleStatus = payload.userCoupleStatus;
    },
  },
});

export const { setCustomColor, setCoupleStatus } = userInfoSlice.actions;
export default userInfoSlice.reducer;
