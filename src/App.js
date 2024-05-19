import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import AppNavigation from "components/AppNavigation";
import Ledger from "pages/Ledger";
import Schedule from "pages/Schedule";
import Setting from "pages/Setting";

function App() {
  const location = useLocation();

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
        {/* <Route
          key={location.pathname}
          element={
            <Calendar
              year={testData.year}
              month={testData.month}
              ledgers={testData.ledgersPerDay}
            />
          }
          path="/test"
        /> */}
      </Routes>
      <AppNavigation />
    </div>
  );
}

export default App;
