import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function SettingLedgerCategoryAdd() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 추가</h2>,
  };

  return <Page headerInfo={headerInfo}></Page>;
}
