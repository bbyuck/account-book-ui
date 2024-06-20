import { TextField } from "@mui/material";
import { getByteLength } from "util/stringUtil";

export default function EmailInput({
  email,
  setEmail,
  emailLabel,
  eamilInputRef,
}) {
  return (
    <TextField
      inputRef={eamilInputRef}
      fullWidth
      label={emailLabel}
      size="small"
      variant="standard"
      onChange={(e) => {
        if (getByteLength(e.target.value) > 40) {
          e.target.value = email;
          return;
        }
        setEmail(e.target.value);
      }}
    />
  );
}
