import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import Page from "components/Page";
import { useLocation, useNavigate } from "react-router";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector } from "react-redux";

export default function LedgerRegister() {
  const navigate = useNavigate();
  const { selectedDate } = useSelector((state) => state.ledgerInfo);

  const headerInfo = {
    left: (
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <NavigateBeforeIcon />
      </IconButton>
    ),
    center: <h2>Hello World</h2>,
  };

  return (
    <Page headerInfo={headerInfo}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <CalendarMonthIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          sx={{ mr: 2, width: "100%" }}
          disabled
          label={`${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일 (${selectedDate.dayName}요일)`}
          variant="standard"
        />
      </Box>
    </Page>
  );
}
