import { Route, Routes, useLocation } from "react-router-dom";
import NavigateToMain from "pages/common/navigate-to-main";
import SettingAccount from "pages/setting/account";
import SettingPasswordChange from "pages/setting/account/password-change";
import SettingLedger from "pages/setting/ledger";
import SettingLedgerCategory from "pages/setting/ledger/category";
import SettingLedgerCategoryAdd from "pages/setting/ledger/category/add";
import SettingLedgerCategoryModify from "pages/setting/ledger/category/modify";

export default function SettingRouter() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        key={location.pathname}
        element={<SettingAccount />}
        path="/account"
      />
      <Route
        key={location.pathname}
        element={<SettingPasswordChange />}
        path="/account/passwordchange"
      />
      <Route
        key={location.pathname}
        element={<SettingLedger />}
        path="/ledger"
      />
      <Route
        key={location.pathname}
        element={<SettingLedgerCategory />}
        path="/ledger/category"
      />
      <Route
        key={location.pathname}
        element={<SettingLedgerCategoryAdd />}
        path="/ledger/category/add"
      />
      <Route
        key={location.pathname}
        element={<SettingLedgerCategoryModify />}
        path="/ledger/category/modify/:selectedLedgerCategoryIndex"
      />

      <Route
        key={location.pathname}
        element={<NavigateToMain app={"setting"} />}
        path="*"
      />
    </Routes>
  );
}
