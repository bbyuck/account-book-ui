import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import { cloneElement, useEffect } from "react";
import AppAlert from "components/AppAlert";
import { useDispatch, useSelector } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import { createBrowserHistory } from "history";
import AppConfirm from "components/AppConfirm";
import AppLoading from "components/AppLoading";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Signup from "pages/Signup";

function App() {
  const history = createBrowserHistory();
  const { pageTransition } = useSelector((state) => state.clientInfo);

  const location = useLocation();
  const { loggedIn, check } = useSelector((state) => state.authInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/app/ledger/main", {
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
