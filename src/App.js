import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import { useEffect } from "react";
import AppAlert from "components/AppAlert";
import { useDispatch, useSelector } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();

  const location = useLocation();
  const loggedIn = useSelector((state) => state.authInfo.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      if (history.action === "POP") {
        dispatch(setPageTransition("pop"));
      }
    });
  }, [history]);

  useEffect(() => {
    console.log(`loggedIn : ${loggedIn}`);
    if (!loggedIn) {
      navigate("/login");
    } else {
      navigate("/app/ledger/main");
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route key={location.pathname} element={<AppRouter />} path="/app/*" />
        <Route key={location.pathname} element={<Login />} path="/login" />
      </Routes>
      <AppAlert />
    </div>
  );
}

export default App;
