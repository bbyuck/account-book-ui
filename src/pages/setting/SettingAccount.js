import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import api from "api";
import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncAuth } from "store/slice/authInfo";
import { openConfirm } from "store/slice/clientInfo";
import { removeJWT } from "util/authUtil";

export default function SettingAccount() {
  const dispatch = useDispatch();
  const { confirmed } = useSelector((state) => state.clientInfo.confirm);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>계정</h2>,
  };

  const openLogoutConfirm = () => {
    dispatch(
      openConfirm({
        open: true,
        title: "로그아웃 하시겠습니까?",
        message: "",
        confirmLabel: "확인",
        cancelLabel: "취소",
        confirmed: false,
      })
    );
  };

  const logout = () => {
    api
      .post("/api/v1/logout")
      .then((response) => {
        if (response.data.data.success) {
          removeJWT();
          dispatch(syncAuth());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (confirmed) {
      logout();
    }
  }, [confirmed]);

  return (
    <Page headerInfo={headerInfo}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemButton onClick={openLogoutConfirm}>
            <ListItemText id="switch-list-label-bluetooth" primary="로그아웃" />
          </ListItemButton>
        </ListItem>
      </List>
    </Page>
  );
}
