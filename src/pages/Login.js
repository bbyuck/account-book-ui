import { Button, FormControlLabel, Link, Switch, styled } from "@mui/material";
import "pages/style/Login.css";
import http from "api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openErrorAlert, setPageTransition } from "store/slice/clientInfo";
import { saveJWT } from "util/authUtil";
import { syncAuth } from "store/slice/authInfo";
import { useNavigate } from "react-router-dom";
import Page from "components/Page";
import AppInputForm from "components/AppInputForm";
import AppInputBox from "components/AppInputBox";
import Subject from "components/Subject";
import PasswordInput from "components/input/PasswordInput";
import EmailInput from "components/input/EmailInput";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toSignUp = () => {
    dispatch(setPageTransition("push"));
    navigate("/signup");
  };

  const login = () => {
    const params = {
      email: email,
      password: password,
      autoLogin: autoLogin,
    };

    http
      .post("/api/v1/authenticate", params)
      .then((response) => {
        saveJWT(response.data.data);
        dispatch(syncAuth());
      })
      .catch((error) => {
        console.log(error);
        dispatch(openErrorAlert(error.response.data.message));
      });
  };

  return (
    <Page
      innerContnentsStyle={{
        height: "100%",
        top: "0px",
      }}
    >
      <div className="login-page-wrapper">
        <Subject value={"Login"} />
        <AppInputForm>
          <AppInputBox>
            <EmailInput
              email={email}
              setEmail={setEmail}
              emailLabel={"이메일"}
            />
          </AppInputBox>
          <AppInputBox>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              passwordLabel={"비밀번호"}
            />
          </AppInputBox>

          <div className="signup-prompt">
            아직 계정이 없으신가요?&nbsp;&nbsp;
            <Link onClick={toSignUp} className={"anchor-button"}>
              Sign up
            </Link>
          </div>

          <AppInputBox>
            <Button
              fullWidth
              variant="contained"
              size={"large"}
              onClick={login}
            >
              Login in
            </Button>
          </AppInputBox>

          <FormControlLabel
            control={
              <AntSwitch
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
                sx={{ m: 1 }}
              />
            }
            label="remeber me"
          />
        </AppInputForm>
      </div>
    </Page>
  );
}
