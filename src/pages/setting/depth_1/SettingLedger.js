import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import ListItemNoButton from "components/ListItemNoButton";
import Page from "components/Page";
import SettingList from "components/SettingList";
import ColorPicker from "components/input/ColorPicker";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";

export default function SettingLedger() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>가계부</h2>,
  };
  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  return (
    <Page headerInfo={headerInfo}>
      <SettingList>
        <ListItemNoButton>
          <ListItemText primary="목록 색 선택" />
          <ColorPicker />
        </ListItemNoButton>
      </SettingList>
    </Page>
  );
}
