import { Route, Routes, useLocation } from "react-router-dom";
import NavigateToMain from "pages/NavigateToMain";
import SettingMain from "pages/setting/SettingMain";
import SettingAccount from "pages/setting/depth_1/SettingAccount";
import SettingPasswordChange from "./depth_2/SettingPasswordChange";

export default function SettingRouter() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route key={location.pathname} element={<SettingMain />} path="/main" />
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
        element={<NavigateToMain app={"setting"} />}
        path="*"
      />
    </Routes>
  );
}
