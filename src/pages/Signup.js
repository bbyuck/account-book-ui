import { Button, FormControlLabel, FormGroup, TextField } from "@mui/material";
import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";
import { getByteLength } from "util/stringUtil";

export default function Signup() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Page
      headerInfo={headerInfo}
      innerContnentsStyle={{
        height: "calc(100svh + 25px)",
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
            <div className="login-input-box">
              <TextField
                fullWidth
                label="Confirm Password"
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

            <div className="login-input-box login-input-button">
              <Button
                fullWidth
                variant="contained"
                size={"large"}
                onClick={() => {}}
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
