import { TextField } from "@mui/material";
import AppInputBox from "components/AppInputBox";
import { getByteLength } from "util/stringUtil";
import PasswordInput from "components/input/PasswordInput";

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
        <PasswordInput
          passwordInputRef={newPasswordInputRef}
          password={newPassword}
          setPassword={setNewPassword}
          passwordLabel={newPasswordLabel}
        />
      </AppInputBox>
      <AppInputBox>
        <PasswordInput
          passwordInputRef={newPasswordConfirmInputRef}
          password={newPasswordConfirm}
          setPassword={setNewPasswordConfirm}
          passwordLabel={newPasswordConfirmLabel}
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
