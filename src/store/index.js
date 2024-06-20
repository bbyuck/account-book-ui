import ledgerInfoSlice from "store/slice/ledgerInfo";
import clientInfoSlice from "store/slice/clientInfo";
import authInfoSlice from "store/slice/authInfo";
import userInfoSlice from "store/slice/userInfo";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ledgerInfo: ledgerInfoSlice,
    clientInfo: clientInfoSlice,
    authInfo: authInfoSlice,
    userInfo: userInfoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
