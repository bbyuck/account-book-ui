import LedgerRouter from "pages/ledger/LedgerRouter";
import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import { setCategories, setCouple, setCustomColor } from "store/slice/userInfo";
import SettingRouter from "pages/setting/SettingRouter";
import Menu from "pages/menu/Menu";
import CoupleRouter from "pages/couple/CoupleRouter";
import { setIcons } from "store/slice/clientInfo";

export default function AppRouter() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { customColor, couple, categories } = useSelector(
    (state) => state.userInfo
  );
  const { icons } = useSelector((state) => state.clientInfo);

  // useEffect(() => {
  //   if (!customColor.loaded) {
  //     api
  //       .get("/api/v1/custom/color")
  //       .then((response) => {
  //         dispatch(setCustomColor(response.data.data.color));
  //       })
  //       .catch((error) => {
  //         /* do nothing */
  //       });
  //   }
  // }, [customColor]);

  // useEffect(() => {
  //   if (!couple.loaded) {
  //     api
  //       .get("/api/v1/couple/status")
  //       .then((response) => {
  //         dispatch(setCouple(response.data.data));
  //       })
  //       .catch((error) => {
  //         /* do nothing */
  //       });
  //   }
  // }, [couple]);

  const initialLoad = () => {
    if (!customColor.loaded) {
      api
        .get("/api/v1/custom/color")
        .then((response) => {
          dispatch(setCustomColor(response.data.data.color));
        })
        .catch((error) => {
          /* do nothing */
        });
    }
    if (!couple.loaded) {
      api
        .get("/api/v1/couple/status")
        .then((response) => {
          dispatch(setCouple(response.data.data));
        })
        .catch((error) => {
          /* do nothing */
        });
    }
    if (!icons.loaded) {
      api
        .get("/api/v1/icons")
        .then((response) => {
          dispatch(setIcons(response.data.data.icons));
        })
        .catch((error) => {});
    }
    if (!categories.loaded) {
      api
        .get("/api/v1/ledger/category")
        .then((response) => {
          setCategories(response.data.data.ledgerCategoryList);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <>
      <Routes location={location}>
        <Route key={location.pathname} element={<Menu />} path="/menu" />
        <Route
          key={location.pathname}
          element={<LedgerRouter />}
          path="/ledger/*"
        />
        <Route
          key={location.pathname}
          element={<SettingRouter />}
          path="/setting/*"
        />
        <Route
          key={location.pathname}
          element={<CoupleRouter />}
          path="/couple/*"
        />
      </Routes>
    </>
  );
}
