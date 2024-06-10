import Schedule from "pages/schedule/Schedule";
import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import AppNavigation from "components/AppNavigation";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { cloneElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import { setCustomColor } from "store/slice/clientInfo";
import SettingRouter from "pages/setting/SettingRouter";

export default function AppRouter() {
  const location = useLocation();
  const { pageTransition } = useSelector((state) => state.clientInfo);
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
      <TransitionGroup
        className="transition-wrapper"
        childFactory={(child) => {
          return cloneElement(child, {
            classNames: pageTransition,
            timeout: pageTransition === "none" ? 0 : 400,
          });
        }}
      >
        <CSSTransition
          key={location.pathname}
          classNames={pageTransition}
          timeout={pageTransition === "none" ? 0 : 400}
        >
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
        </CSSTransition>
      </TransitionGroup>
      <AppNavigation />
    </>
  );
}
