import Page from "components/Page";
import CategoryGrid from "components/category-grid";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function SettingLedgerCategory() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 설정</h2>,
  };

  return (
    <Page headerInfo={headerInfo}>
      <CategoryGrid />
    </Page>
  );
}
