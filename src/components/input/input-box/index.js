export default function AppInputBox({ children, style, className }) {
  return (
    <div
      className={className ? "app-input-box " + className : "app-input-box"}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
