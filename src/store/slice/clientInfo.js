import { createSlice } from "@reduxjs/toolkit";

const initialPageTransition = "push";

const initialState = {
  pageTransition: initialPageTransition,
};

const clientInfoSlice = createSlice({
  name: "clientInfo",
  initialState,
  reducers: {
    setPageTransition(state = initialState, action) {
      state.pageTransition = action.payload;
    },
    resetPageTransition(state = initialState) {
      state.pageTransition = initialPageTransition;
    },
  },
});

export const { setPageTransition, resetPageTransition } =
  clientInfoSlice.actions;
export default clientInfoSlice.reducer;
