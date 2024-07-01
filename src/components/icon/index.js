import { ReactSVG } from "react-svg";

export default function Icon({ name, fill, size, style }) {
  return (
    <ReactSVG
      src={`${process.env.PUBLIC_URL}/assets/icons/${name}.svg`}
      style={{
        ...style,
        width: size ? size : "25px",
        height: size ? size : "25px",
        fill: fill ? fill : null,
      }}
    />
  );
}
