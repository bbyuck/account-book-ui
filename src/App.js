import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import DatePickerModal from "components/input/DatePickerModal";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route key={location.pathname} element={<AppRouter />} path="/app/*" />
        <Route key={location.pathname} element={<Login />} path="/login" />
        <Route
          key={location.pathname}
          element={<DatePickerModal />}
          path="/comp"
        />
      </Routes>
    </div>
  );
}

export default App;
