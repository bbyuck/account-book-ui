import Schedule from "pages/schedule/Schedule";
import Setting from "pages/setting/Setting";
import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import AppNavigation from "components/AppNavigation";

export default function AppRouter() {
  const location = useLocation();

  return (
    <>
      <Routes location={location}>
        <Route
          key={location.pathname}
          element={<LedgerRouter />}
          path="/ledger/*"
        />
        <Route
          key={location.pathname}
          element={<Schedule />}
          path="/schedule/*"
        />
        <Route
          key={location.pathname}
          element={<Setting />}
          path="/setting/*"
        />
      </Routes>
      <AppNavigation />
    </>
  );
}
