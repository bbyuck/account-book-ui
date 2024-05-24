import { Box, TextField } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
import {
  fromLocaleStringToNumber,
  removeAllLeadingZero,
} from "util/numberUtil";

export default function MoneyInput({ style, value, max, onChange, label }) {
  const defaultMax = 100000000; // 1억 default

  const numericInput = (e) => {
    if (e.key === "Backspace") {
      onChange(
        fromLocaleStringToNumber(
          removeAllLeadingZero(value.slice(0, -1))
        ).toLocaleString()
      );
      return;
    } else if (e.key < "0" || e.key > "9") {
      return;
    }

    const changedNumber = fromLocaleStringToNumber(
      removeAllLeadingZero(value + e.key)
    );
    if (changedNumber > (max ? max : defaultMax)) {
      alert(
        `금액은 ${
          max ? max.toLocaleString() : defaultMax.toLocaleString()
        } 미만으로 입력해야 합니다.`
      );
      return;
    }

    onChange(changedNumber.toLocaleString());
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", ...style }}>
      <MoneyIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        sx={{ mr: 2, width: "100%" }}
        variant="standard"
        type="text"
        value={value}
        label={label}
        inputMode="numeric"
        onPaste={(e) => e.preventDefault()}
        onKeyDown={(e) => numericInput(e)}
      />
    </Box>
  );
}
