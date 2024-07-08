import { Box, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePickerModal from "./modal";
import "./index.css";

export default function DatePicker({
  label,
  disabled = false,
  pickerOpen,
  setPickerOpen,
  selectedDate,
  selectDate,
}) {
  const handleDatePickerTouch = () => {
    if (disabled) {
      return;
    }
    setPickerOpen(true);
  };

  return (
    <>
      {disabled ? null : (
        <DatePickerModal
          open={pickerOpen}
          selectedDate={selectedDate}
          selectDate={selectDate}
          onClose={() => {
            setPickerOpen(false);
          }}
          onDatePicked={() => {
            setPickerOpen(false);
          }}
        />
      )}
      <Box
        sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }}
        onTouchEnd={handleDatePickerTouch}
      >
        <CalendarMonthIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
        <TextField
          sx={{ mr: 2, width: "100%" }}
          label={label}
          className={disabled ? "" : "disabled-textfield-button"}
          disabled={true}
          value={`${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일 (${selectedDate.dayName}요일)`}
          variant="standard"
        />
      </Box>
    </>
  );
}
