import Schedule from "pages/schedule/Schedule";
import Setting from "pages/setting/Setting";
import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import AppNavigation from "components/AppNavigation";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { cloneElement } from "react";
import { useSelector } from "react-redux";

export default function AppRouter() {
  const location = useLocation();
  const { pageTransition } = useSelector((state) => state.clientInfo);

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
              element={<Setting />}
              path="/setting/*"
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <AppNavigation />
    </>
  );
}
