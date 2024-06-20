import { Button, FormGroup, TextField } from "@mui/material";
import api from "api";
import AppInputBox from "components/AppInputBox";
import AppInputForm from "components/AppInputForm";
import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";
import NewPasswordInput from "components/input/NewPasswordInput";
import PasswordInput from "components/input/PasswordInput";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { syncAuth } from "store/slice/authInfo";
import {
  closeConfirm,
  openConfirm,
  openErrorAlert,
  openSuccessAlert,
} from "store/slice/clientInfo";
import { removeJWT } from "util/authUtil";
import { getByteLength } from "util/stringUtil";

export default function SettingPasswordChange() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newPasswordConfirmInputRef = useRef();

  const validationErrorCodeTarget = {
    ERR_USR_003: passwordInputRef,
    ERR_VALID_002: passwordInputRef,
    ERR_VALID_003: newPasswordInputRef,
    ERR_VALID_004: newPasswordConfirmInputRef,
    ERR_VALID_005: newPasswordConfirmInputRef,
    ERR_USR_004: newPasswordInputRef,
  };

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>비밀번호 변경</h2>,
  };

  const clientSidePasswordValidation = () => {
    if (password.length === 0) {
      dispatch(openErrorAlert("비밀번호를 입력해주세요."));
      passwordInputRef.current.focus();
      return false;
    }

    if (newPassword.length === 0) {
      dispatch(openErrorAlert("새 비밀번호를 입력해주세요."));
      newPasswordInputRef.current.focus();
      return false;
    }

    if (newPasswordConfirm.length === 0) {
      dispatch(openErrorAlert("새 비밀번호 확인을 입력해주세요."));
      newPasswordConfirmInputRef.current.focus();
      return false;
    }

    if (newPassword !== newPasswordConfirm) {
      dispatch(openErrorAlert("입력된 새 비밀번호가 서로 다릅니다."));
      newPasswordConfirmInputRef.current.focus();
      return false;
    }

    if (password === newPassword) {
      dispatch(openErrorAlert("동일한 비밀번호로 변경할 수 없습니다."));
      newPasswordInputRef.current.focus();
      return false;
    }

    return true;
  };

  const changePassword = () => {
    const params = {
      password: password,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
    };
    api
      .put("/api/v1/user/password", params)
      .then((response) => {
        // dispatch(setPageTransition("pop"));
        dispatch(openSuccessAlert(response.data.message));

        removeJWT();
        dispatch(syncAuth());
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch(openErrorAlert(error.response.data.message));
          validationErrorCodeTarget[error.response.data.code].current.focus();
        }
      });
  };

  const openPasswordChangeConfirm = () => {
    if (!clientSidePasswordValidation()) {
      return;
    }

    dispatch(
      openConfirm({
        open: true,
        title: "비밀번호를 변경 하시겠습니까?",
        message: "",
        confirmLabel: "확인",
        cancelLabel: "취소",
        onConfirmed: () => {
          changePassword();
          dispatch(closeConfirm());

          return true;
        },
      })
    );
  };

  return (
    <Page headerInfo={headerInfo}>
      <AppInputForm>
        <AppInputBox>
          <PasswordInput
            passwordInputRef={passwordInputRef}
            password={password}
            setPassword={setPassword}
            passwordLabel={"비밀번호"}
          />
        </AppInputBox>

        <NewPasswordInput
          newPassword={newPassword}
          newPasswordConfirm={newPasswordConfirm}
          newPasswordInputRef={newPasswordInputRef}
          newPasswordConfirmInputRef={newPasswordConfirmInputRef}
          setNewPassword={setNewPassword}
          setNewPasswordConfirm={setNewPasswordConfirm}
          newPasswordLabel={"새 비밀번호"}
          newPasswordConfirmLabel={"새 비밀번호 확인"}
        />
        <AppInputBox
          style={{
            position: "absolute",
            bottom: "70px",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            size={"large"}
            onClick={openPasswordChangeConfirm}
          >
            변경
          </Button>
        </AppInputBox>
      </AppInputForm>
    </Page>
  );
}
