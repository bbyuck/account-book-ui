import AppHeader from "./AppHeader";

export default function Page({ className, children, headerInfo, preLoggedIn }) {
  const classes = "page-wrapper " + (className ? className : "");
  headerInfo =
    headerInfo === undefined
      ? { left: null, center: null, right: null }
      : headerInfo;
  const { left, center, right } = headerInfo;

  return (
    <div className={classes}>
      <AppHeader left={left} center={center} right={right} />
      <div
        id={
          preLoggedIn
            ? "pre-logged-in-page-contents-wrapper"
            : "page-contents-wrapper"
        }
      >
        {children}
      </div>
    </div>
  );
}
