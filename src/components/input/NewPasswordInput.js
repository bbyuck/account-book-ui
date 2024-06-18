import { TextField } from "@mui/material";
import AppInputBox from "components/AppInputBox";
import { getByteLength } from "util/stringUtil";

export default function NewPasswordInput({
  newPassword,
  newPasswordConfirm,
  newPasswordInputRef,
  newPasswordConfirmInputRef,
  setNewPassword,
  setNewPasswordConfirm,
  newPasswordLabel,
  newPasswordConfirmLabel,
}) {
  return (
    <>
      <AppInputBox>
        <TextField
          inputRef={newPasswordInputRef}
          fullWidth
          label={newPasswordLabel}
          type="password"
          variant="standard"
          onChange={(e) => {
            if (getByteLength(e.target.value) > 20) {
              e.target.value = newPassword;
              return;
            }
            setNewPassword(e.target.value);
          }}
        />
      </AppInputBox>
      <AppInputBox>
        <TextField
          inputRef={newPasswordConfirmInputRef}
          fullWidth
          label={newPasswordConfirmLabel}
          type="password"
          variant="standard"
          onChange={(e) => {
            if (getByteLength(e.target.value) > 20) {
              e.target.value = newPasswordConfirm;
              return;
            }
            setNewPasswordConfirm(e.target.value);
          }}
        />
      </AppInputBox>

      <AppInputBox
        style={{
          textAlign: "left",
          fontSize: "11px",
          width: "300px",
          marginBottom: "25px",
        }}
      >
        &#8251; 비밀번호는 영문 / 숫자 / 특수문자를 각각 1자 이상 포함하여
        8~16자로 입력해주세요.
      </AppInputBox>
    </>
  );
}
