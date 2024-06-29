import Page from "components/Page";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/input/HeaderBackButton";
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

  const add = {
    id: null,
    iconName: "plus",
    name: "추가",
    ledgerCode: "NONE",
    fill: `#${customColor.value}`,
    action: () => {
      goForward("/app/setting/ledger/category/add");
    },
  };
  const [categoryButtons, setCategoryButtons] = useState([add]);

  useEffect(() => {
    setCategoryButtons(
      categories.value
        .map((category, index) => {
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
        .concat(add)
    );
  }, [categories]);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 설정</h2>,
  };
  return (
    <Page headerInfo={headerInfo}>
      <CategoryGrid categories={categoryButtons} />
    </Page>
  );
}
