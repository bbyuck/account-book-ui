import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import api from "api";
import ListItemNoButton from "components/ListItemNoButton";
import Page from "components/Page";
import SettingList from "components/SettingList";
import ColorPicker from "components/input/ColorPicker";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  openErrorAlert,
  openSuccessAlert,
  setCustomColor,
  setPageTransition,
} from "store/slice/clientInfo";

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

  const { customColor } = useSelector((state) => state.clientInfo);
  const [settingColor, setSettingColor] = useState(customColor);

  const selectColor = (selectedColor, initialColor) => {
    if (customColor === settingColor) {
      return;
    }
    const params = {
      customCode: "COLOR",
      customValue: selectedColor.replace(/#/g, ""),
    };
    api
      .post("/api/v1/custom", params)
      .then((response) => {
        dispatch(openSuccessAlert(response.data.message));
        dispatch(setCustomColor(selectedColor.replace(/#/g, "")));
      })
      .catch((error) => {
        dispatch(openErrorAlert(error.data.data.message));
        setSettingColor(initialColor);
      });
  };

  return (
    <Page headerInfo={headerInfo}>
      <SettingList>
        <ListItemNoButton>
          <ListItemText primary="테마 컬러 선택" />
          <ColorPicker
            value={settingColor}
            setValue={setSettingColor}
            selectColor={selectColor}
          />
        </ListItemNoButton>
      </SettingList>
    </Page>
  );
}
