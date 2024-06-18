import "@melloware/coloris/dist/coloris.css";
import { coloris, init, close } from "@melloware/coloris";
import { useEffect } from "react";

export default function ColorPicker() {
  useEffect(() => {
    init();
    coloris({ el: "#coloris" });

    console.log(coloris);
    return () => {
      close();
    };
  }, []);
  return <div id="coloris"></div>;
}
