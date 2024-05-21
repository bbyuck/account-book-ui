import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import AppNavigation from "components/AppNavigation";
import Ledger from "pages/Ledger";
import Schedule from "pages/Schedule";
import Setting from "pages/Setting";
import AppHeader from "components/AppHeader";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const ledgerInfo = useSelector((state) => state.ledgerInfo);

  return (
    <div className="App">
      <Routes location={location}>
        <Route key={location.pathname} element={<Login />} path="/login" />
        <Route key={location.pathname} element={<Ledger />} path="/ledger" />
        <Route
          key={location.pathname}
          element={<Schedule />}
          path="/schedule"
        />
        <Route key={location.pathname} element={<Setting />} path="/setting" />
      </Routes>
      <AppNavigation />
    </div>
  );
}

export default App;
