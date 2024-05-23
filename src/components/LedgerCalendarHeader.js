import "components/style/LedgerCalendarHeader.css";

export default function LedgerCalendarHeader({ income, expenditure }) {
  return (
    <div className="subheader-wrapper">
      <div
        style={{ display: "inline-block", position: "absolute", left: "10px" }}
      >
        {`수입 +${income ? income.toLocaleString() : 0}원`}
      </div>
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          right: "10px",
        }}
      >
        {`지출 -${expenditure ? expenditure.toLocaleString() : 0}원`}
      </div>
    </div>
  );
}
