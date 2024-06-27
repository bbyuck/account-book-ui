import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function SettingLedgerCategoryModify() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>카테고리 수정</h2>,
  };

  return <Page headerInfo={headerInfo}></Page>;
}
