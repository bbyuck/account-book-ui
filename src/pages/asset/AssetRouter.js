import { Route, Routes, useLocation } from "react-router-dom";
import AssetMain from "pages/asset/AssetMain";

export default function AssetRouter() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route key={location.pathname} element={<AssetMain />} path="/asset" />
    </Routes>
  );
}
