import { Route, Routes, useLocation } from "react-router-dom";
import NavigateToMain from "pages/NavigateToMain";
import CoupleConnect from "pages/couple/depth_1/CoupleConnect";

export default function CoupleRouter() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        key={location.pathname}
        element={<CoupleConnect />}
        path="/connect"
      />

      <Route
        key={location.pathname}
        element={<NavigateToMain app={"couple"} />}
        path="*"
      />
    </Routes>
  );
}
