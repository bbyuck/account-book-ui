import { Button, FormControlLabel, FormGroup, TextField } from "@mui/material";
import api from "api";
import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";
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
        <div className="poetsen-one-regular">
          <h1>Sign up</h1>
        </div>
        <FormGroup>
          <div className="login-input-form">
            <div className="login-input-box">
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
            </div>
            <div className="login-input-box">
              <TextField
                inputRef={passwordInputRef}
                fullWidth
                label="비밀번호"
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
            </div>
            <div className="login-input-box">
              <TextField
                inputRef={passwordConfirmInputRef}
                fullWidth
                label="비밀번호 확인"
                type="password"
                variant="standard"
                onChange={(e) => {
                  if (getByteLength(e.target.value) > 20) {
                    e.target.value = passwordConfirm;
                    return;
                  }
                  setPasswordConfirm(e.target.value);
                }}
              />
            </div>

            <div
              style={{
                textAlign: "left",
                fontSize: "11px",
                width: "300px",
                marginBottom: "25px",
              }}
            >
              &#8251; 비밀번호는 영문 / 숫자 / 특수문자를 각각 1자 이상 포함하여
              <br />
              &nbsp;&nbsp;&nbsp;8~16자로 입력해주세요.
            </div>
            <div className="login-input-box login-input-button">
              <Button
                fullWidth
                variant="contained"
                size={"large"}
                onClick={signup}
              >
                Sign up
              </Button>
            </div>
          </div>
        </FormGroup>
      </div>
    </Page>
  );
}
