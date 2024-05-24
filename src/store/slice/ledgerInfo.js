import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
export const namesOfDay = ["일", "월", "화", "수", "목", "금", "토"];

const initialState = {
  selectedDate: {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    dayName: namesOfDay[today.getDay()],
  },
};

const ledgerInfoSlice = createSlice({
  name: "ledgerInfo",
  initialState,
  reducers: {
    setSelectedDate(state = initialState, action) {
      state.selectedDate = {
        ...action.payload,
        dayName:
          namesOfDay[
            new Date(
              action.payload.year,
              action.payload.month - 1,
              action.payload.day
            ).getDay()
          ],
      };
    },
  },
});

export const { setSelectedDate } = ledgerInfoSlice.actions;
export default ledgerInfoSlice.reducer;
