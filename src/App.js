import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import AutoGridNoWrap from "pages/AutoGridNoWrap";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes location={location}>
        <Route key={location.pathname} element={<Login />} path="/login" />
        <Route
          key={location.pathname}
          element={<AutoGridNoWrap />}
          path="/test"
        />
      </Routes>
    </div>
  );
}

export default App;
