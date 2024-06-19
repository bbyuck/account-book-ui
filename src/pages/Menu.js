import { IconButton } from "@mui/material";

import Page from "components/Page";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import HomeIcon from "@mui/icons-material/Home";
import SettingMenuList from "./setting/SettingMenuList";

export default function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBackToLedgerMain = () => {
    dispatch(setPageTransition("pop"));
    navigate("/app/ledger/main", {
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
      <SettingMenuList />
    </Page>
  );
}
