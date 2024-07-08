import Page from "components/page/index";

export default function MobileOnly() {
  return (
    <Page
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div className="block-message" id="message">
        <h1>PC 버전 준비 중</h1>
        <p>
          현재 모바일 버전만 준비되어 있습니다.
          <br />
          모바일 기기에서 접속해 주세요.
        </p>
      </div>
    </Page>
  );
}
