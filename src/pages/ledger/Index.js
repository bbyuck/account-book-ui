import { cloneElement, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LedgerMain from "./LedgerMain";
import LedgerRegister from "./LedgerRegister";
import "style/transition.css";

export default function Index() {
  const location = useLocation();
  const [isNext, setIsNext] = useState(true);

  window.onpopstate = () => {
    setIsNext(false);
  };

  return (
    <>
      <TransitionGroup
        className="transition-wrapper"
        childFactory={(child) => {
          const childElement = cloneElement(child, {
            className: isNext ? "right-to-left" : "left-to-right",
            timeout: 300,
          });
          return childElement;
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
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
