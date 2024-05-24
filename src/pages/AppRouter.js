import Schedule from "pages/schedule/Schedule";
import Setting from "pages/setting/Setting";
import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import AppNavigation from "components/AppNavigation";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { cloneElement, useEffect, useState } from "react";

export default function AppRouter() {
  const location = useLocation();
  const [animation, setAnimation] = useState("pop");

  useEffect(() => {
    window.addEventListener("popstate", (event) => {
      setAnimation("pop");
    });
    return () => {
      window.removeEventListener("popstate");
    };
  }, []);

  useEffect(() => {
    if (location.state) {
      if (location.state.push) {
        setAnimation("push");
      }
    }
  }, [location.pathname]);

  return (
    <>
      <TransitionGroup
        className="transition-wrapper"
        childFactory={(child) => {
          return cloneElement(child, {
            classNames: animation,
            timeout: 400,
          });
        }}
      >
        <CSSTransition
          key={location.pathname}
          classNames={animation}
          timeout={400}
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
