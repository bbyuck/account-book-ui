import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import { useEffect } from "react";
import AppAlert from "components/AppAlert";
import { useDispatch, useSelector } from "react-redux";
import { setCustomColor, setPageTransition } from "store/slice/clientInfo";
import { createBrowserHistory } from "history";
import AppConfirm from "components/AppConfirm";
import api from "api";

function App() {
  const history = createBrowserHistory();

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
    <div className="App">
      <Routes>
        <Route key={location.pathname} element={<AppRouter />} path="/app/*" />
        <Route key={location.pathname} element={<Login />} path="/login" />
      </Routes>
      <AppAlert />
      <AppConfirm />
    </div>
  );
}

export default App;
