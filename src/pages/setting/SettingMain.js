import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import Page from "components/Page";

export default function SettingMain() {
  const headerInfo = {
    center: <h2>{`설정`}</h2>,
  };

  return (
    <Page headerInfo={headerInfo}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            계정
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        </ListItem>
      </List>
    </Page>
  );
}
