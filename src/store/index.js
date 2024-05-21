import ledgerInfoSlice from "store/slice/ledgerInfo";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ledgerInfo: ledgerInfoSlice,
  },
});

export default store;
