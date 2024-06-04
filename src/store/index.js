import ledgerInfoSlice from "store/slice/ledgerInfo";
import clientInfoSlice from "store/slice/clientInfo";
import authInfoSlice from "store/slice/authInfo";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ledgerInfo: ledgerInfoSlice,
    clientInfo: clientInfoSlice,
    authInfo: authInfoSlice,
  },
});

export default store;
