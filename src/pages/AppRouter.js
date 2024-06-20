import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import { setCoupleStatus, setCustomColor } from "store/slice/userInfo";
import SettingRouter from "pages/setting/SettingRouter";
import Menu from "pages/menu/Menu";
import CoupleRouter from "pages/couple/CoupleRouter";

export default function AppRouter() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { customColor, coupleStatus, userCoupleStatus } = useSelector(
    (state) => state.userInfo
  );

  useEffect(() => {
    if (!customColor) {
      api.get("/api/v1/custom/color").then((response) => {
        dispatch(setCustomColor(response.data.data.color));
      });
    }
  }, [customColor]);

  useEffect(() => {
    if (!coupleStatus && !userCoupleStatus) {
      api.get("/api/v1/couple/status").then((response) => {
        dispatch(setCoupleStatus(response.data.data));
      });
    }
  }, [coupleStatus, userCoupleStatus]);

  return (
    <>
      <Routes location={location}>
        <Route key={location.pathname} element={<Menu />} path="/menu" />
        <Route
          key={location.pathname}
          element={<LedgerRouter />}
          path="/ledger/*"
        />
        <Route
          key={location.pathname}
          element={<SettingRouter />}
          path="/setting/*"
        />
        <Route
          key={location.pathname}
          element={<CoupleRouter />}
          path="/couple/*"
        />
      </Routes>
    </>
  );
}
