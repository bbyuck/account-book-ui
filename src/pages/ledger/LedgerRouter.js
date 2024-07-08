import { Route, Routes, useLocation } from "react-router-dom";
import LedgerMain from "pages/ledger/main";
import LedgerRegister from "pages/ledger/register";
import LedgerUpdate from "pages/ledger/update";
import NavigateToMain from "pages/NavigateToMain";

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
        element={<LedgerUpdate />}
        path="/detail/:ledgerId"
      />
      <Route
        key={location.pathname}
        element={<NavigateToMain app={"ledger"} />}
        path="*"
      />
    </Routes>
  );
}
