import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import { setCouple, setCustomColor } from "store/slice/userInfo";
import SettingRouter from "pages/setting/SettingRouter";
import Menu from "pages/menu/Menu";
import CoupleRouter from "pages/couple/CoupleRouter";

export default function AppRouter() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { customColor, couple } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!customColor.loaded) {
      api
        .get("/api/v1/custom/color")
        .then((response) => {
          dispatch(setCustomColor(response.data.data.color));
        })
        .catch((error) => {
          /* do nothing */
        });
    }
  }, [customColor]);

  useEffect(() => {
    if (!couple.loaded) {
      api
        .get("/api/v1/couple/status")
        .then((response) => {
          dispatch(setCouple(response.data.data));
        })
        .catch((error) => {
          /* do nothing */
        });
    }
  }, [couple]);

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
