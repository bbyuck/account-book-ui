import { Button, Link, TextField } from "@mui/material";
import "style/font.css";
import "style/Login.css";

export default function Login() {
  const toSignUp = () => {
    alert(
      "회원 가입 페이지는 준비중입니다. 계정 발급은 관리자에게 문의해주세요."
    );
  };

  return (
    <div className="page-wrapper">
      <div className="login-page-wrapper">
        <div className="poetsen-one-regular">
          <h1>Login</h1>
        </div>
        <div className="login-input-form">
          <div className="login-input-box">
            <TextField
              fullWidth
              label="Email"
              id="standard-size-small"
              size="small"
              variant="standard"
            />
          </div>
          <div className="login-input-box">
            <TextField
              fullWidth
              label="Password"
              type="password"
              id="standard-size-normal"
              variant="standard"
            />
          </div>
          <div className="login-input-box login-input-button">
            <Button fullWidth variant="contained" size={"large"}>
              Login in
            </Button>
          </div>
          <div className="signup-prompt">
            아직 계정이 없으신가요?{" "}
            <Link onClick={toSignUp} className={"anchor-button"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
