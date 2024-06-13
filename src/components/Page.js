import AppHeader from "./AppHeader";

export default function Page({
  className,
  children,
  headerInfo,
  innerContnentsStyle,
}) {
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
        id="page-contents-wrapper"
        style={{
          ...innerContnentsStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
