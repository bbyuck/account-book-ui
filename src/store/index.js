import ledgerInfoSlice from "store/slice/ledgerInfo";
import clientInfoSlice from "store/slice/clientInfo";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ledgerInfo: ledgerInfoSlice,
    clientInfo: clientInfoSlice,
  },
});

export default store;
