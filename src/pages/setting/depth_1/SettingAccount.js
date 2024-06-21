import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import api from "api";
import Page from "components/Page";
import MenuList from "components/MenuList";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openConfirm, setPageTransition } from "store/slice/clientInfo";
import { removeJWT } from "util/authUtil";

export default function SettingAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>계정 설정</h2>,
  };

  const openLogoutConfirm = () => {
    dispatch(
      openConfirm({
        open: true,
        title: "로그아웃 하시겠습니까?",
        message: "",
        confirmLabel: "확인",
        cancelLabel: "취소",
        onConfirmed: () => {
          logout();
          return true;
        },
      })
    );
  };

  const logout = () => {
    api
      .post("/api/v1/logout")
      .then((response) => {
        if (response.data.data.success) {
          removeJWT();
          sessionStorage.setItem("logout", true);
          sessionStorage.setItem("logoutMessage", response.data.message);
          window.location.replace(`${process.env.PUBLIC_URL}/login`);
        }
      })
      .catch((error) => {
        /**
         * Nothing to do
         */
      });
  };

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <Page headerInfo={headerInfo}>
      <MenuList>
        <ListItem>
          <ListItemButton onClick={openLogoutConfirm}>
            <ListItemText primary="로그아웃" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => goForward("/app/setting/account/passwordchange")}
          >
            <ListItemText primary="비밀번호 변경" />
          </ListItemButton>
        </ListItem>
      </MenuList>
    </Page>
  );
}
