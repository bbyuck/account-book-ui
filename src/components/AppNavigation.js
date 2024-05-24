import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SavingsIcon from "@mui/icons-material/Savings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppNavigation() {
  const [selectedTab, setSelectedTab] = useState("ledger");
  const navigate = useNavigate();
  const handleChangeBottomNavigation = (event, newValue) => {
    setSelectedTab(newValue);
    navigate(`/app/${newValue}/main`);
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
