import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuList from "components/MenuList";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SavingsIcon from "@mui/icons-material/Savings";

export default function SettingMenuList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <MenuList subheader={"설정"}>
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
    </MenuList>
  );
}
