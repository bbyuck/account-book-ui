import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const initialState = {
  selectedMonth: {
    year: today.getFullYear(),
    month: today.getMonth(),
  },
};

const ledgerInfoSlice = createSlice({
  name: "ledgerInfo",
  initialState,
  reducers: {
    setSelectedMonth(state = initialState, action) {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = ledgerInfoSlice.actions;
export default ledgerInfoSlice.reducer;
