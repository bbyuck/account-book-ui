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
    setCustomColor(state = initialState, action) {
      state.customColor = action.payload;
    },
    setCoupleStatus(state = initialState, action) {
      state.coupleStatus = action.payload.coupleStatus;
      state.userCoupleStatus = action.payload.userCoupleStatus;
    },
  },
});

export const { resetUserStore, setCustomColor, setCoupleStatus } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
