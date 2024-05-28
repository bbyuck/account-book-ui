import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";

import AppRouter from "pages/AppRouter";
import DatePickerModal from "components/input/DatePickerModal";
import { useState } from "react";

function App() {
  const location = useLocation();

  const [open, setOpen] = useState(true);

  return (
    <div className="App">
      <Routes>
        <Route key={location.pathname} element={<AppRouter />} path="/app/*" />
        <Route key={location.pathname} element={<Login />} path="/login" />
        <Route
          key={location.pathname}
          element={
            <DatePickerModal open={open} onClose={() => setOpen(false)} />
          }
          path="/comp"
        />
      </Routes>
    </div>
  );
}

export default App;
