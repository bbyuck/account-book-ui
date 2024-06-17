import { Button, FormGroup, TextField } from "@mui/material";
import api from "api";
import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { syncAuth } from "store/slice/authInfo";
import {
  closeConfirm,
  openConfirm,
  openErrorAlert,
  openSuccessAlert,
  setPageTransition,
} from "store/slice/clientInfo";
import { removeJWT } from "util/authUtil";
import { getByteLength } from "util/stringUtil";

export default function SettingPasswordChange() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { confirmed } = useSelector((state) => state.clientInfo.confirm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const validationErrorCodeTarget = {
    ERR_VALID_002: passwordInputRef,
    ERR_VALID_003: passwordInputRef,
    ERR_VALID_004: passwordConfirmInputRef,
    ERR_VALID_005: passwordConfirmInputRef,
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

  const changePassword = () => {
    if (!clientSidePasswordValidation()) {
      return;
    }

    const params = {
      password: password,
      passwordConfirm: passwordConfirm,
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
    dispatch(
      openConfirm({
        open: true,
        title: "비밀번호를 변경 하시겠습니까?",
        message: "",
        confirmLabel: "확인",
        cancelLabel: "취소",
        confirmed: false,
      })
    );
  };

  useEffect(() => {
    if (confirmed) {
      changePassword();

      dispatch(closeConfirm());
    }
  }, [confirmed]);

  return (
    <Page headerInfo={headerInfo}>
      <FormGroup>
        <div className="login-input-form">
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
        </div>
        <Button
          sx={{ position: "absolute", width: "100%", bottom: "50px" }}
          onClick={openPasswordChangeConfirm}
        >
          변경
        </Button>
      </FormGroup>
    </Page>
  );
}
