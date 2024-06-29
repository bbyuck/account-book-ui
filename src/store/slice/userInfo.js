import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupleStatus: null,
  userCoupleStatus: null,
  customColor: {
    loaded: false,
    value: null,
  },
  categories: {
    loaded: false,
    value: [],
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    resetUserStore: () => initialState,
    setCustomColor(state = initialState, action) {
      state.customColor.loaded = true;
      state.customColor.value = action.payload;
    },
    setCoupleStatus(state = initialState, action) {
      state.coupleStatus = action.payload.coupleStatus;
      state.userCoupleStatus = action.payload.userCoupleStatus;
    },
    setCategories(state = initialState, action) {
      state.categories.loaded = true;
      state.categories.value = action.payload;
    },
  },
});

export const {
  resetUserStore,
  setCustomColor,
  setCoupleStatus,
  setCategories,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
