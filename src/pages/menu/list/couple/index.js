import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuList from "components/menu-list";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import ListItemNoButton from "components/list-item-no-button";

const Connected = () => {
  return (
    <ListItemNoButton>
      <ListItemIcon>
        <HandshakeIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="연결됨" />
    </ListItemNoButton>
  );
};

const Wait = () => {
  return (
    <ListItemNoButton>
      <ListItemIcon>
        <HandshakeIcon />
      </ListItemIcon>
      <ListItemText primary="연결 대기중" />
    </ListItemNoButton>
  );
};

const NotConnectedYet = ({ action }) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => action("/app/couple/connect")}>
        <ListItemIcon>
          <HandshakeIcon />
        </ListItemIcon>
        <ListItemText primary="커플 연결" />
      </ListItemButton>
    </ListItem>
  );
};

export default function CoupleMenuList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { couple } = useSelector((state) => state.userInfo);

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <MenuList subheader={"커플"}>
      {couple.coupleStatus === "ACTIVE" ? (
        <Connected />
      ) : couple.userCoupleStatus === "ACTIVE" ? (
        <Wait />
      ) : (
        <NotConnectedYet action={goForward} />
      )}
    </MenuList>
  );
}
