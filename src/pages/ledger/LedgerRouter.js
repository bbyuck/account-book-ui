import { Route, Routes, useLocation } from "react-router-dom";
import LedgerMain from "pages/ledger/main";
import LedgerRegister from "pages/ledger/register";
import LedgerModify from "pages/ledger/modify";
import NavigateToMain from "pages/common/navigate-to-main";
import LedgerStatistic from "pages/ledger/statistic";

export default function LedgerRouter() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route key={location.pathname} element={<LedgerMain />} path="/" />
      <Route
        key={location.pathname}
        element={<LedgerRegister />}
        path="/register"
      />
      <Route
        key={location.pathname}
        element={<LedgerModify />}
        path="/detail/:ledgerId"
      />
      <Route
        key={location.pathname}
        element={<LedgerStatistic />}
        path="/statistic"
      />
      <Route
        key={location.pathname}
        element={<NavigateToMain app={"ledger"} />}
        path="*"
      />
    </Routes>
  );
}
