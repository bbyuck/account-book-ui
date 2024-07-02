import { IconButton } from "@mui/material";
import Page from "components/Page";
import CategoryGrid from "components/category-grid";
import HeaderAddButton from "components/header/add-button";
import HeaderBackButton from "components/header/back-button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";

export default function SettingLedgerCategory() {
  const { customColor, categories } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  // const add = {
  //   id: null,
  //   iconName: "plus",
  //   name: "추가",
  //   ledgerCode: "NONE",
  //   fill: `#${customColor.value}`,
  //   action: () => {
  //     goForward("/app/setting/ledger/category/add");
  //   },
  // };
  const [categoryButtons, setCategoryButtons] = useState([]);

  useEffect(() => {
    setCategoryButtons(
      categories.value.map((category, index) => {
        const categoryButton = {
          id: category.ledgerCategoryId,
          iconName: category.iconName,
          ledgerCode: category.ledgerCode,
          name: category.ledgerCategoryName,
          action: () =>
            // goForward(`/app/setting/ledger/category/modify/${category.id}`),
            goForward(`/app/setting/ledger/category/modify/${index}`),
        };
        return categoryButton;
      })
    );
  }, [categories]);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 설정</h2>,
    right: <HeaderAddButton targetPage={"/app/setting/ledger/category/add"} />,
  };
  return (
    <Page headerInfo={headerInfo}>
      <CategoryGrid
        categories={categoryButtons}
        emptyLabelTitle={"카테고리가 없습니다."}
        emptyLabelBody={"우측 상단 + 버튼을 눌러 추가해주세요."}
      />
    </Page>
  );
}
