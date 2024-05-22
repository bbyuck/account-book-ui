import { cloneElement } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LedgerMain from "pages/ledger/LedgerMain";
import LedgerRegister from "pages/ledger/LedgerRegister";
import LedgerUpdate from "pages/ledger/LedgerUpdate";

export default function LedgerRouter() {
  const location = useLocation();

  return (
    <>
      <TransitionGroup
        className="transition-wrapper"
        childFactory={(child) => {
          return cloneElement(child, {
            classNames:
              location.state && location.state.push
                ? "right-to-left"
                : "left-to-right",
            timeout: 300,
          });
        }}
      >
        <CSSTransition
          key={location.pathname}
          classNames="right-to-left"
          timeout={300}
        >
          <Routes location={location}>
            <Route
              key={location.pathname}
              element={<LedgerMain />}
              path="/main"
            />
            <Route
              key={location.pathname}
              element={<LedgerRegister />}
              path="/register"
            />
            <Route
              key={location.pathname}
              element={<LedgerUpdate />}
              path="/update"
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
