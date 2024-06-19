import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import { setCustomColor } from "store/slice/clientInfo";
import SettingRouter from "pages/setting/SettingRouter";
import Menu from "pages/menu/Menu";

export default function AppRouter() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { customColor } = useSelector((state) => state.clientInfo);

  useEffect(() => {
    if (!customColor) {
      api
        .get("/api/v1/custom/color")
        .then((response) => {
          dispatch(setCustomColor(response.data.data.color));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
      </Routes>
    </>
  );
}
