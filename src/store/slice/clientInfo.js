import { createSlice } from "@reduxjs/toolkit";

const initialPageTransition = "push";
const initialAlert = {
  open: false,
  message: "",
  type: "success",
};

const initialState = {
  pageTransition: initialPageTransition,
  alert: initialAlert,
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
    closeAlert(state = initialState) {
      state.alert = {
        open: false,
        message: state.alert.message,
        type: state.alert.type,
      };
    },
    openSuccessAlert(state = initialState, action) {
      state.alert = {
        open: true,
        message: action.payload,
        type: "success",
      };
    },
    openErrorAlert(state = initialState, action) {
      state.alert = {
        open: true,
        message: action.payload,
        type: "error",
      };
    },
  },
});

export const {
  setPageTransition,
  resetPageTransition,
  closeAlert,
  openSuccessAlert,
  openErrorAlert,
} = clientInfoSlice.actions;
export default clientInfoSlice.reducer;
