import { Divider, IconButton } from "@mui/material";

import Page from "components/page/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import HomeIcon from "@mui/icons-material/Home";
import SettingMenuList from "pages/menu/list/setting";
import AssetMenuList from "pages/menu/list/asset";
import CoupleMenuList from "pages/menu/list/couple";

export default function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBackToLedgerMain = () => {
    dispatch(setPageTransition("pop"));
    navigate("/app/ledger", {
      replace: true,
    });
  };

  const headerInfo = {
    left: (
      <IconButton onClick={goBackToLedgerMain}>
        <HomeIcon />
      </IconButton>
    ),
  };

  return (
    <Page headerInfo={headerInfo}>
      <CoupleMenuList />
      <AssetMenuList />
      <SettingMenuList />
    </Page>
  );
}
