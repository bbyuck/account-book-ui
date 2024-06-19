import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function CoupleConnect() {
  const headerInfo = {
    left: <HeaderBackButton />,
    center: <h2>커플 연결</h2>,
  };

  return <Page headerInfo={headerInfo}></Page>;
}
