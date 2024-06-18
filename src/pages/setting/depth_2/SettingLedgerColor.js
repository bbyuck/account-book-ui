import Page from "components/Page";
import ColorPicker from "components/input/ColorPicker";
import HeaderBackButton from "components/input/HeaderBackButton";

export default function SettingLedgerColor() {
  const headerInfo = {
    left: <HeaderBackButton />,
  };
  return (
    <Page headerInfo={headerInfo}>
      <ColorPicker />
    </Page>
  );
}
