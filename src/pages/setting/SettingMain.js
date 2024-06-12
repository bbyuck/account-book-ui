import {
  IconButton,
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
import HomeIcon from "@mui/icons-material/Home";

export default function SettingMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  const goBackToLedgerMain = () => {
    dispatch(setPageTransition("pop"));
    navigate("/app/ledger/main", {
      replace: true,
    });
  };

  const headerInfo = {
    left: (
      <IconButton onClick={goBackToLedgerMain}>
        <HomeIcon />
      </IconButton>
    ),
    center: <h2>{`설정`}</h2>,
  };

  return (
    <Page headerInfo={headerInfo}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemButton onClick={() => goForward("/app/setting/account")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="계정" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              alert("가계부 설정은 준비중입니다.");
            }}
          >
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="가계부" />
          </ListItemButton>
        </ListItem>
      </List>
    </Page>
  );
}
