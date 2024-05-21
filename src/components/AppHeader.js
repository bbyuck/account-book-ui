import "components/style/AppHeader.css";

export default function AppHeader({ left, center, right }) {
  return (
    <div className="app-header">
      <div className="app-header-item app-header-item-right">
        {left === undefined || !left ? null : left}
      </div>
      <div className="app-header-item">
        {center === undefined || !center ? null : center}
      </div>
      <div className="app-header-item app-header-item-right">
        {right === undefined || !right ? null : right}
      </div>
    </div>
  );
}
