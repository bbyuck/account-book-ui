import {
  Button,
  FormControlLabel,
  FormGroup,
  Link,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import "pages/style/Login.css";
import http from "api";
import { useState } from "react";
import { getByteLength } from "util/stringUtil";
import { useDispatch } from "react-redux";
import { openErrorAlert } from "store/slice/clientInfo";
import { saveJWT } from "util/authUtil";
import { syncAuth } from "store/slice/authInfo";

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

  const toSignUp = () => {
    alert(
      "회원 가입 페이지는 준비중입니다. 계정 발급은 관리자에게 문의해주세요."
    );
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

    console.log(params);
  };

  return (
    <div className="page-wrapper">
      <div className="login-page-wrapper">
        <div className="poetsen-one-regular">
          <h1>Login</h1>
        </div>
        <FormGroup>
          <div className="login-input-form">
            <div className="login-input-box">
              <TextField
                fullWidth
                label="Email"
                id="standard-size-small"
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
                fullWidth
                label="Password"
                type="password"
                id="standard-size-normal"
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

            <div className="signup-prompt">
              아직 계정이 없으신가요?
              <Link onTouchEnd={toSignUp} className={"anchor-button"}>
                Sign up
              </Link>
            </div>
            <div className="login-input-box login-input-button">
              <Button
                fullWidth
                variant="contained"
                size={"large"}
                onTouchEnd={login}
              >
                Login in
              </Button>
            </div>
            <div style={{ textAlign: "left" }}>
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
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
  );
}
