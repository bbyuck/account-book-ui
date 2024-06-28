import { Box, TextField } from "@mui/material";
import { getByteLength } from "util/stringUtil";

const DEFAULT_MAX_BYTE_LENGTH = 20;

export default function TextInput({
  style,
  label,
  value,
  onChange,
  MuiIcon,
  maxByteLenth,
}) {
  maxByteLenth = maxByteLenth ? maxByteLenth : DEFAULT_MAX_BYTE_LENGTH;

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", ...style }}>
      <MuiIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
      <TextField
        sx={{ mr: 2, width: "100%" }}
        variant="standard"
        label={label}
        type="text"
        value={value}
        onChange={(e) => {
          if (getByteLength(e.target.value) > maxByteLenth) {
            e.target.value = value;
            return;
          }
          onChange(e.target.value);
        }}
      />
    </Box>
  );
}
