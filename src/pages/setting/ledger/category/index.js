import { IconButton } from "@mui/material";
import Page from "components/page/index";
import CategoryGrid from "components/category-grid";
import HeaderAddButton from "components/header/add-button";
import HeaderBackButton from "components/header/back-button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";

export default function SettingLedgerCategory() {
  const { categories } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  const [saveCategoryButtons, setSaveCategoryButtons] = useState([]);
  const [incomeCategoryButtons, setIncomeCategoryButtons] = useState([]);
  const [expenditureCategoryButtons, setExpenditureCategoryButtons] = useState(
    []
  );

  const buttonMapper = (category, index) => {
    const categoryButton = {
      id: category.ledgerCategoryId,
      iconName: category.iconName,
      ledgerCode: category.ledgerCode,
      name: category.ledgerCategoryName,
      action: () => goForward(`/app/setting/ledger/category/modify/${index}`),
    };
    return categoryButton;
  };

  useEffect(() => {
    setSaveCategoryButtons(
      categories.value
        .filter((category) => category.ledgerCode === "S")
        .map(buttonMapper)
    );
    setIncomeCategoryButtons(
      categories.value
        .filter((category) => category.ledgerCode === "I")
        .map(buttonMapper)
    );
    setExpenditureCategoryButtons(
      categories.value
        .filter((category) => category.ledgerCode === "E")
        .map(buttonMapper)
    );
  }, [categories]);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: "카테고리 설정",
    right: <HeaderAddButton targetPage={"/app/setting/ledger/category/add"} />,
  };
  return (
    <Page headerInfo={headerInfo}>
      {categories.length === 0 ? (
        <CategoryGrid
          categories={[]}
          emptyLabelTitle={"카테고리가 없습니다."}
          emptyLabelBody={"우측 상단 + 버튼을 눌러 추가해주세요."}
        />
      ) : (
        <>
          <CategoryGrid categories={saveCategoryButtons} header={"저축"} />
          <CategoryGrid categories={incomeCategoryButtons} header={"수입"} />
          <CategoryGrid
            categories={expenditureCategoryButtons}
            header={"지출"}
          />
        </>
      )}
    </Page>
  );
}
