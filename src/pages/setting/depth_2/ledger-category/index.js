import Page from "components/Page";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";

const CATEGORY_LIST = [
  {
    id: 1,
    iconSrcPath: "credit-card",
    name: "배달비",
    ledgerCode: "E",
  },
  {
    id: 2,
    iconSrcPath: "taxi",
    name: "택시비",
    ledgerCode: "E",
  },
  {
    id: 3,
    iconSrcPath: "spoon",
    name: "식비",
    ledgerCode: "E",
  },
  {
    id: 4,
    iconSrcPath: "hospital",
    name: "의료비",
    ledgerCode: "E",
  },
  {
    id: 5,
    iconSrcPath: "heart",
    name: "데이트",
    ledgerCode: "E",
  },
  {
    id: 6,
    iconSrcPath: "martini-glass-citrus",
    name: "술값",
    ledgerCode: "E",
  },
];

export default function SettingLedgerCategory() {
  const { customColor } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };

  const add = {
    id: null,
    iconSrcPath: "plus",
    name: "추가",
    ledgerCode: "NONE",
    fill: `#${customColor}`,
    action: () => {
      goForward("/app/setting/ledger/category/add");
    },
  };
  const [categories, setCategories] = useState([add]);

  useEffect(() => {
    setCategories(
      CATEGORY_LIST.map((category) => {
        category.action = () =>
          goForward(`/app/setting/ledger/category/modify/${category.id}`);
        return category;
      }).concat(add)
    );
  }, []);

  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 설정</h2>,
  };
  return (
    <Page headerInfo={headerInfo}>
      <CategoryGrid categories={categories} />
    </Page>
  );
}
