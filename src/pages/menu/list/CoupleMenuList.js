import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuList from "components/MenuList";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import ListItemNoButton from "components/ListItemNoButton";

const Connected = () => {
  return (
    <ListItemNoButton>
      <ListItemIcon>
        <HandshakeIcon />
      </ListItemIcon>
      <ListItemText primary="연결됨" />
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

  const { coupleStatus, userCoupleStatus } = useSelector(
    (state) => state.userInfo
  );

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <MenuList subheader={"커플"}>
      {coupleStatus === "ACTIVE" ? (
        <Connected />
      ) : (
        <NotConnectedYet action={goForward} />
      )}
    </MenuList>
  );
}
