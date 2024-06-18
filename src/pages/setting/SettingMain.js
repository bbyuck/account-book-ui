import {
  IconButton,
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
import SettingList from "components/SettingList";

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
      <SettingList>
        <ListItem>
          <ListItemButton onClick={() => goForward("/app/setting/account")}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="계정" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => goForward("/app/setting/ledger")}>
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText primary="가계부" />
          </ListItemButton>
        </ListItem>
      </SettingList>
    </Page>
  );
}
