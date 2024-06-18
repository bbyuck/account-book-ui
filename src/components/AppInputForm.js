export default function AppInputForm({ children, style, className }) {
  return (
    <div
      className={className ? "app-input-form " + className : "app-input-form"}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}
