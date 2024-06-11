import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function SettingAccount() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>계정</h2>,
  };

  return <Page headerInfo={headerInfo}></Page>;
}
