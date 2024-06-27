import { Route, Routes, useLocation } from "react-router-dom";
import NavigateToMain from "pages/NavigateToMain";
import SettingAccount from "pages/setting/depth_1/SettingAccount";
import SettingPasswordChange from "pages/setting/depth_2/SettingPasswordChange";
import SettingLedger from "pages/setting/depth_1/SettingLedger";
import SettingLedgerCategory from "pages/setting/depth_2/ledger-category";
import SettingLedgerCategoryAdd from "./depth_3/ledger-category-add";
import SettingLedgerCategoryModify from "./depth_3/ledger-category-modify";

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
        path="/ledger/category/modify/:ledgerCategoryId"
      />

      <Route
        key={location.pathname}
        element={<NavigateToMain app={"setting"} />}
        path="*"
      />
    </Routes>
  );
}
