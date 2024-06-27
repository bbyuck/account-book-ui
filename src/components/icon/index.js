import { ReactSVG } from "react-svg";

export default function Icon({ src }) {
  return (
    <ReactSVG
      src={`${process.env.PUBLIC_URL}/assets/icons/${src}.svg`}
      style={{ width: "25px", height: "25px" }}
    />
  );
}
