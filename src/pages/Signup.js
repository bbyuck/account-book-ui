import { Button, FormControlLabel, FormGroup, TextField } from "@mui/material";
import api from "api";
import AppInputBox from "components/AppInputBox";
import AppInputForm from "components/AppInputForm";
import Page from "components/Page";
import Subject from "components/Subject";
import HeaderBackButton from "components/input/HeaderBackButton";
import NewPasswordInput from "components/input/NewPasswordInput";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  closeAlert,
  openErrorAlert,
  openSuccessAlert,
  setPageTransition,
} from "store/slice/clientInfo";
import { getByteLength } from "util/stringUtil";

export default function Signup() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const validationErrorCodeTarget = {
    ERR_VALID_000: emailInputRef,
    ERR_VALID_001: emailInputRef,
    ERR_VALID_002: passwordInputRef,
    ERR_VALID_003: passwordInputRef,
    ERR_VALID_004: passwordConfirmInputRef,
    ERR_VALID_005: passwordConfirmInputRef,
  };

  const clientSideEmailValidation = () => {
    if (email.length === 0) {
      dispatch(openErrorAlert("이메일을 입력해주세요."));
      emailInputRef.current.focus();
      return false;
    }

    return true;
  };
  const clientSidePasswordValidation = () => {
    if (password.length === 0) {
      dispatch(openErrorAlert("비밀번호를 입력해주세요."));
      passwordInputRef.current.focus();
      return false;
    }

    if (passwordConfirm.length === 0) {
      dispatch(openErrorAlert("비밀번호 확인을 입력해주세요."));
      passwordConfirmInputRef.current.focus();
      return false;
    }

    if (password !== passwordConfirm) {
      dispatch(openErrorAlert("비밀번호가 다릅니다."));
      passwordConfirmInputRef.current.focus();
      return false;
    }

    return true;
  };

  const signup = () => {
    if (!clientSideEmailValidation()) {
      return;
    }

    if (!clientSidePasswordValidation()) {
      return;
    }

    const params = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    api
      .post("/api/v1/signup", params)
      .then((response) => {
        dispatch(setPageTransition("pop"));
        dispatch(openSuccessAlert(response.data.message));
        navigate("/login", {
          replace: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch(openErrorAlert(error.response.data.message));
          validationErrorCodeTarget[error.response.data.code].current.focus();
        }
      });
  };

  return (
    <Page
      headerInfo={headerInfo}
      innerContnentsStyle={{
        height: "100%",
        top: "0px",
      }}
    >
      <div className="login-page-wrapper">
        <Subject value={"Sign up"} />
        <AppInputForm>
          <AppInputBox>
            <TextField
              inputRef={emailInputRef}
              fullWidth
              label="이메일"
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
          </AppInputBox>
          <NewPasswordInput
            newPassword={password}
            newPasswordConfirm={passwordConfirm}
            newPasswordInputRef={passwordInputRef}
            newPasswordConfirmInputRef={passwordConfirmInputRef}
            setNewPassword={setPassword}
            setNewPasswordConfirm={setPasswordConfirm}
            newPasswordLabel={"비밀번호"}
            newPasswordConfirmLabel={"비밀번호 확인"}
          />
          <AppInputBox>
            <Button
              fullWidth
              variant="contained"
              size={"large"}
              onClick={signup}
            >
              Sign up
            </Button>
          </AppInputBox>
        </AppInputForm>
      </div>
    </Page>
  );
}
