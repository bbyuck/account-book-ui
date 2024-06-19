import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuList from "components/MenuList";
import HandshakeIcon from "@mui/icons-material/Handshake";

export default function CoupleMenuList() {
  return (
    <MenuList subheader={"커플"}>
      <ListItem>
        <ListItemButton
          onClick={() => alert("커플 연결 서비스는 준비중입니다.")}
        >
          <ListItemIcon>
            <HandshakeIcon />
          </ListItemIcon>
          <ListItemText primary="커플 연결" />
        </ListItemButton>
      </ListItem>
    </MenuList>
  );
}
