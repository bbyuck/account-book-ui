import "./index.css";

export default function AppHeader({ left, center, right }) {
  return (
    <div className="app-header">
      <div className="app-header-item app-header-item-left">
        {left === undefined || !left ? null : left}
      </div>
      <div className="app-header-item">
        {center === undefined || !center ? null : <h2>{center}</h2>}
      </div>
      <div className="app-header-item app-header-item-right">
        {right === undefined || !right ? null : right}
      </div>
    </div>
  );
}
