import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import AppNavigation from "components/AppNavigation";
import Schedule from "pages/schedule/Schedule";
import Setting from "pages/setting/Setting";
import LedgerIndex from "pages/ledger/Index";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes location={location}>
        <Route key={location.pathname} element={<Login />} path="/login" />
        <Route
          key={location.pathname}
          element={<LedgerIndex />}
          path="/ledger/*"
        />
        <Route
          key={location.pathname}
          element={<Schedule />}
          path="/schedule/*"
        />
        <Route key={location.pathname} element={<Setting />} path="/setting" />
      </Routes>
      <AppNavigation />
    </div>
  );
}

export default App;
