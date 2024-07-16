import HeaderBackButton from "components/header/back-button";
import Page from "components/page";

export default function LedgerAnnualStatistic() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };

  return <Page headerInfo={headerInfo}></Page>;
}
