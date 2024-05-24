import { Box, TextField } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";

export default function MoneyInput({ style, value, max, onChange }) {
  const defaultMax = 100000000; // 1억 default

  /**
   * 왼쪽의 모든 0을 제거
   * @param {String} str
   * @returns
   */
  const removeAllLeadingZero = (str) => {
    return str.replace(/^0+/, "");
  };

  const getNumberValue = (str) => {
    return Number(str.replace(/,/g, ""));
  };

  const numericInput = (e) => {
    if (e.key === "Backspace") {
      onChange(
        getNumberValue(
          removeAllLeadingZero(value.slice(0, -1))
        ).toLocaleString()
      );
    } else if (e.key < "0" || e.key > "9") {
      return;
    } else {
      if (getNumberValue(value) > (max ? max : defaultMax)) {
        alert(
          `금액은 ${
            max ? max.toLocaleString() : defaultMax.toLocaleString()
          } 미만으로 입력해야 합니다.`
        );
        return;
      }

      onChange(
        getNumberValue(removeAllLeadingZero(value + e.key)).toLocaleString()
      );
    }
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
        label="금액을 입력해주세요."
        inputMode="numeric"
        onKeyDown={(e) => numericInput(e)}
      />
    </Box>
  );
}
