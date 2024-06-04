import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import { useEffect } from "react";
import AppAlert from "components/AppAlert";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.authInfo.loggedIn);
  const navigate = useNavigate();

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
