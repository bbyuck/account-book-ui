import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuList from "components/MenuList";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";

export default function CoupleMenuList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <MenuList subheader={"커플"}>
      <ListItem>
        <ListItemButton onClick={() => goForward("/app/couple/connect")}>
          <ListItemIcon>
            <HandshakeIcon />
          </ListItemIcon>
          <ListItemText primary="커플 연결" />
        </ListItemButton>
      </ListItem>
    </MenuList>
  );
}
