export default function LedgerSubHeader({ income, expenditure }) {
  return (
    <div className="subheader-wrapper">
      <div
        style={{ display: "inline-block", position: "relative", left: "5px" }}
      >
        {`소득 : ${income.toLocaleString()}원`}
      </div>
      <div
        style={{
          display: "inline-block",
          position: "relative",
          right: "5px",
        }}
      >
        {`지출 : ${expenditure.toLocaleString()}원`}
      </div>
    </div>
  );
}
