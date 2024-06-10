import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SavingsIcon from "@mui/icons-material/Savings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";

export default function AppNavigation() {
  const [selectedTab, setSelectedTab] = useState("ledger");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeBottomNavigation = (event, newValue) => {
    setSelectedTab(newValue);
    dispatch(setPageTransition("switch"));
    navigate(`/app/${newValue}/main`, {
      replace: true,
    });
  };

  return (
    <>
      <BottomNavigation
        sx={{ width: "100%", position: "fixed", bottom: 0 }}
        value={selectedTab}
        onChange={handleChangeBottomNavigation}
      >
        <BottomNavigationAction
          label="가계부"
          value="ledger"
          icon={<SavingsIcon />}
        />
        <BottomNavigationAction
          label="일정"
          value="schedule"
          icon={<CalendarMonthIcon />}
        />
        <BottomNavigationAction
          label="설정"
          value="setting"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </>
  );
}
