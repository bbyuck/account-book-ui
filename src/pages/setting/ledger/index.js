import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import api from "api";
import ListItemNoButton from "components/list-item-no-button";
import Page from "components/page/index";
import MenuList from "components/menu-list";
import ColorPicker from "components/input/color-picker";
import HeaderBackButton from "components/header/back-button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  openErrorAlert,
  openSuccessAlert,
  setPageTransition,
} from "store/slice/clientInfo";
import { setCustomColor } from "store/slice/userInfo";

export default function SettingLedger() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>가계부 설정</h2>,
  };
  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  const { customColor } = useSelector((state) => state.userInfo);
  const [settingColor, setSettingColor] = useState(customColor.value);

  const selectColor = (selectedColor, initialColor) => {
    if (customColor.value === settingColor) {
      return;
    }
    const params = {
      customCode: "COLOR",
      customValue: selectedColor.replace(/#/g, ""),
    };
    api
      .post("/api/v1/custom", params)
      .then((response) => {
        dispatch(setCustomColor(selectedColor.replace(/#/g, "")));
      })
      .catch((error) => {
        dispatch(openErrorAlert(error.data.data.message));
        setSettingColor(initialColor);
      });
  };

  return (
    <Page headerInfo={headerInfo}>
      <MenuList>
        <ListItemNoButton>
          <ListItemText primary="개인 컬러 선택" />
          <ColorPicker
            value={settingColor}
            setValue={setSettingColor}
            selectColor={selectColor}
          />
        </ListItemNoButton>
        <ListItem>
          <ListItemButton
            onClick={() => goForward("/app/setting/ledger/category")}
          >
            <ListItemText primary="카테고리 설정" />
          </ListItemButton>
        </ListItem>
      </MenuList>
    </Page>
  );
}
