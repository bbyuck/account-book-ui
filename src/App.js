import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "pages/login/index";

import AppRouter from "pages/AppRouter";
import { cloneElement, useEffect, useState } from "react";
import AppAlert from "components/alert";
import { useDispatch, useSelector } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import { createBrowserHistory } from "history";
import AppConfirm from "components/confirm";
import AppLoading from "components/loading";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Signup from "pages/signup/index";
import MobileOnly from "pages/common/mobile-only";
import { isMobileDevice } from "util/clientUtil";

function App() {
  const history = createBrowserHistory();
  const { pageTransition } = useSelector((state) => state.clientInfo);

  const location = useLocation();
  const { loggedIn, check } = useSelector((state) => state.authInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  });

  useEffect(() => {
    if (!isMobile) {
      dispatch(setPageTransition("switch"));
      navigate("/pc", {
        replace: true,
      });
    }
  }, [navigate, isMobile]);

  useEffect(() => {
    history.listen((location) => {
      if (history.action === "POP") {
        const buttonBack = sessionStorage.getItem("buttonBack");
        dispatch(setPageTransition(buttonBack ? "pop" : "none"));
        sessionStorage.removeItem("buttonBack");
      }
    });
  }, [history]);

  useEffect(() => {
    if (!loggedIn) {
      dispatch(setPageTransition("switch"));
      navigate("/login", {
        replace: true,
      });
    } else if (loggedIn) {
      dispatch(setPageTransition("switch"));
      navigate("/app/ledger", {
        replace: true,
      });
    }
  }, [check]);

  return (
    <div className="App">
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
              element={<AppRouter />}
              path="/app/*"
            />
            <Route key={location.pathname} element={<Login />} path="/login" />
            <Route
              key={location.pathname}
              element={<Signup />}
              path="/signup"
            />
            <Route
              key={location.pathname}
              element={<MobileOnly />}
              path="/pc"
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>

      <AppLoading />
      <AppAlert />
      <AppConfirm />
    </div>
  );
}

export default App;
