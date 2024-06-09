import { createSlice } from "@reduxjs/toolkit";

const initialPageTransition = "push";
const initialAlert = {
  open: false,
  message: "",
  type: "success",
};
const initialConfirm = {
  open: false,
  title: "",
  message: "",
  confirmLabel: "확인",
  cancelLabel: "닫기",
  confirmed: false,
};

const initialState = {
  pageTransition: initialPageTransition,
  alert: initialAlert,
  confirm: initialConfirm,
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
    procConfirm(state = initialState) {
      state.confirm = {
        open: false,
        title: state.confirm.title,
        message: state.confirm.message,
        confirmLabel: state.confirm.confirmLabel,
        cancelLabel: state.confirm.cancelLabel,
        confirmed: true,
      };
    },
    cancelConfirm(state = initialState, action) {
      state.confirm = {
        open: false,
        title: state.confirm.title,
        message: state.confirm.message,
        confirmLabel: state.confirm.confirmLabel,
        cancelLabel: state.confirm.cancelLabel,
        confirmed: false,
      };
    },
    openConfirm(state = initialState, action) {
      state.confirm = {
        open: true,
        title: action.payload.title,
        message: action.payload.message,
        confirmLabel: action.payload.confirmLabel
          ? action.payload.confirmLabel
          : state.confirm.confirmLabel,
        cancelLabel: action.payload.cancelLabel
          ? action.payload.cancelLabel
          : state.confirm.cancelLabel,
        confirmed: false,
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
  procConfirm,
  cancelConfirm,
  openConfirm,
} = clientInfoSlice.actions;
export default clientInfoSlice.reducer;
