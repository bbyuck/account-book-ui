import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import api from "api";
import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useDispatch } from "react-redux";
import { syncAuth } from "store/slice/authInfo";
import { removeJWT } from "util/authUtil";

export default function SettingAccount() {
  const dispatch = useDispatch();

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>계정</h2>,
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

  return (
    <Page headerInfo={headerInfo}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Divider component="li" />
        <ListItem>
          <ListItemButton onClick={logout}>
            <ListItemText id="switch-list-label-bluetooth" primary="로그아웃" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
      </List>
    </Page>
  );
}
