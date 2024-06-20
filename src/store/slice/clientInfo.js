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
  onConfirmed: null,
};

const initialState = {
  pageTransition: initialPageTransition,
  alert: initialAlert,
  confirm: initialConfirm,
  loading: false,
  loadingReady: false,
};

const clientInfoSlice = createSlice({
  name: "clientInfo",
  initialState,
  reducers: {
    resetClientStore: () => initialState,
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
    closeConfirm(state = initialState, action) {
      state.confirm = {
        open: false,
        title: state.confirm.title,
        message: state.confirm.message,
        confirmLabel: state.confirm.confirmLabel,
        cancelLabel: state.confirm.cancelLabel,
        onConfirmed: null,
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
        onConfirmed: action.payload.onConfirmed,
      };
    },

    loadingReady(state = initialState) {
      state.loadingReady = true;
    },
    loadingStart(state = initialState) {
      if (state.loadingReady) {
        state.loading = true;
      }
    },
    loadingEnd(state = initialState) {
      state.loadingReady = false;
      state.loading = false;
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
  closeConfirm,
  openConfirm,
  loadingStart,
  loadingEnd,
  loadingReady,
  resetClientStore,
} = clientInfoSlice.actions;
export default clientInfoSlice.reducer;
