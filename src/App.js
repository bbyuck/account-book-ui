import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route key={location.pathname} element={<AppRouter />} path="/app/*" />
        <Route key={location.pathname} element={<Login />} path="/login" />
      </Routes>
    </div>
  );
}

export default App;
