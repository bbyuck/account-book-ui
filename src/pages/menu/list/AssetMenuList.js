import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuList from "components/MenuList";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function AssetMenuList() {
  return (
    <MenuList subheader={"자산"}>
      <ListItem>
        <ListItemButton
          onClick={() => alert("보유 자산 서비스는 준비중입니다.")}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="보유 자산" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => alert("목표 자산 서비스는 준비중입니다.")}
        >
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="목표 자산" />
        </ListItemButton>
      </ListItem>
    </MenuList>
  );
}
