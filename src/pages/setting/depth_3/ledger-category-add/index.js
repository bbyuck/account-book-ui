import Page from "components/Page";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/input/HeaderBackButton";
import { useEffect, useState } from "react";

const ICON_LIST = [
  {
    id: 1,
    iconSrcPath: "credit-card",
  },
  {
    id: 2,
    iconSrcPath: "taxi",
  },
  {
    id: 3,
    iconSrcPath: "spoon",
  },
  {
    id: 4,
    iconSrcPath: "hospital",
  },
  {
    id: 5,
    iconSrcPath: "heart",
  },
  {
    id: 6,
    iconSrcPath: "martini-glass-citrus",
  },
];

export default function SettingLedgerCategoryAdd() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 추가</h2>,
  };

  const [icons, setIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(-1);

  useEffect(() => {
    setIcons(
      ICON_LIST.map((icon) => {
        icon.action = () => {
          setSelectedIcon(icon.id);
        };
        return icon;
      })
    );
  }, []);

  return (
    <Page headerInfo={headerInfo}>
      <CategoryGrid categories={icons} selected={selectedIcon} />
    </Page>
  );
}
