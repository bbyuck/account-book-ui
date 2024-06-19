import ledgerInfoSlice from "store/slice/ledgerInfo";
import clientInfoSlice from "store/slice/clientInfo";
import authInfoSlice from "store/slice/authInfo";
import userInfoSlice from "store/slice/userInfo";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ledgerInfo: ledgerInfoSlice,
    clientInfo: clientInfoSlice,
    authInfo: authInfoSlice,
    userInfo: userInfoSlice,
  },
});

export default store;
