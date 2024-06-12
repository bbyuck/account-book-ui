import Schedule from "pages/schedule/Schedule";
import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "api";
import { setCustomColor } from "store/slice/clientInfo";
import SettingRouter from "pages/setting/SettingRouter";

export default function AppRouter() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/api/v1/custom/color")
      .then((response) => {
        dispatch(setCustomColor(response.data.data.color));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          element={<SettingRouter />}
          path="/setting/*"
        />
      </Routes>
    </>
  );
}
