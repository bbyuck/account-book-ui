import "./index.css";

export default function LedgerCarouselHeader({ income, expenditure, save }) {
  return (
    <div className="subheader-wrapper">
      <div
        style={{ display: "inline-block", position: "absolute", left: "10px" }}
      >
        {`수입 ${income ? income.toLocaleString() : 0}원`}
      </div>

      <div
        style={{
          display: "inline-block",
          position: "absolute",
          right: "10px",
        }}
      >
        {`지출 ${expenditure ? expenditure.toLocaleString() : 0}원`}
      </div>
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          right: "10px",
          top: "30px",
        }}
      >
        {`저축 ${save ? save.toLocaleString() : 0}원`}
      </div>
    </div>
  );
}
