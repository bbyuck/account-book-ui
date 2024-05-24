import { Box, TextField } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function DatePicker({
  label,
  disabled = false,
  year,
  month,
  day,
  dayName,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px" }}>
      <CalendarMonthIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        sx={{ mr: 2, width: "100%" }}
        label={label}
        className={disabled ? "" : "disabled-textfield-button"}
        disabled={true}
        value={`${year}년 ${month}월 ${day}일 (${dayName}요일)`}
        variant="standard"
      />
    </Box>
  );
}
