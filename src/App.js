import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import Calendar from "components/Calendar";
import Main from "pages/Main";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";

const testData = {
  year: 2024,
  month: 4,
  totalAmount: 6960000,
  ledgersPerDay: {
    1: {
      ledgers: [
        {
          ownerNickname: "히욱",
          ledgerCode: "E",
          ledgerCodeValue: "지출",
          day: 1,
          amount: 100000,
          description: "M소비1",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 100000,
    },
    2: {
      ledgers: [
        {
          ownerNickname: "히욱",
          ledgerCode: "E",
          ledgerCodeValue: "지출",
          day: 2,
          amount: 200000,
          description: "M소비2",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 200000,
    },
    3: {
      ledgers: [
        {
          ownerNickname: "히욱",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 3,
          amount: 150000,
          description: "M저축1",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 150000,
    },
    4: {
      ledgers: [
        {
          ownerNickname: "히욱",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 4,
          amount: 220000,
          description: "M저축2",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 220000,
    },
    21: {
      ledgers: [
        {
          ownerNickname: "히욱",
          ledgerCode: "I",
          ledgerCodeValue: "소득",
          day: 21,
          amount: 4000000,
          description: "M월급",
        },
        {
          ownerNickname: "히욱",
          ledgerCode: "E",
          ledgerCodeValue: "지출",
          day: 21,
          amount: 4000000,
          description: "M월급",
        },
      ],
      dailyIncome: 4000000000,
      dailyExpenditure: 4000000,
    },
    5: {
      ledgers: [
        {
          ownerNickname: "아내",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 5,
          amount: 150000,
          description: "W저축1",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 150000,
    },
    8: {
      ledgers: [
        {
          ownerNickname: "아내",
          ledgerCode: "S",
          ledgerCodeValue: "저축",
          day: 8,
          amount: 220000,
          description: "W저축2",
        },
      ],
      dailyIncome: 0,
      dailyExpenditure: 220000,
    },
    25: {
      ledgers: [
        {
          ownerNickname: "아내",
          ledgerCode: "I",
          ledgerCodeValue: "소득",
          day: 25,
          amount: 4000000,
          description: "W월급",
        },
      ],
      dailyIncome: 4000000,
      dailyExpenditure: 0,
    },
  },
};

function App() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("recents");

  const handleChangeBottomNavigation = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="App">
      <Routes location={location}>
        <Route key={location.pathname} element={<Login />} path="/login" />
        <Route key={location.pathname} element={<Main />} path="/main" />
        <Route
          key={location.pathname}
          element={
            <Calendar
              year={testData.year}
              month={testData.month}
              ledgers={testData.ledgersPerDay}
            />
          }
          path="/test"
        />
      </Routes>
      <BottomNavigation
        sx={{ width: "100%", position: "fixed", bottom: 0 }}
        value={selectedTab}
        onChange={handleChangeBottomNavigation}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default App;
