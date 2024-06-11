import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";
import Page from "components/Page";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";

export default function SettingMain() {
  const headerInfo = {
    center: <h2>{`설정`}</h2>,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goTo = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <Page headerInfo={headerInfo}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Divider component="li" />
        <ListItem>
          <ListItemButton onClick={() => goTo("/app/setting/account")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="계정" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="가계부" />
          </ListItemButton>
        </ListItem>
        <Divider component="li" />
      </List>
    </Page>
  );
}