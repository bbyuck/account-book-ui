import Page from "components/Page";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function Signup() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };

  return <Page headerInfo={headerInfo}>회원가입 페이지입니다.</Page>;
}
