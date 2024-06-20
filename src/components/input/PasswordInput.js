import { TextField } from "@mui/material";
import { getByteLength } from "util/stringUtil";

export default function PasswordInput({
  passwordInputRef,
  password,
  setPassword,
  passwordLabel,
}) {
  return (
    <TextField
      inputRef={passwordInputRef}
      fullWidth
      label={passwordLabel}
      type="password"
      variant="standard"
      onChange={(e) => {
        if (getByteLength(e.target.value) > 20) {
          e.target.value = password;
          return;
        }
        setPassword(e.target.value);
      }}
    />
  );
}
