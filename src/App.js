import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import { useEffect, useState } from "react";
import AppAlert from "components/AppAlert";
import { useSelector } from "react-redux";
import { createBrowserHistory } from "history";

function App() {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.authInfo.loggedIn);
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const [locationKeys, setLocationKeys] = useState([]);

  useEffect(() => {
    history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        setLocationKeys(([_, ...keys]) => keys);
      } else {
        setLocationKeys((keys) => [location.key, ...keys]);

        history.push("");
      }
    });
  }, []);

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
