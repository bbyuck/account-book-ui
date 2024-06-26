import { Route, Routes, useLocation } from "react-router-dom";
import LedgerMain from "pages/ledger/depth_1/LedgerMain";
import LedgerRegister from "pages/ledger/depth_2/LedgerRegister";
import LedgerDetail from "pages/ledger/depth_2/LedgerDetail";
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
        element={<LedgerDetail />}
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
