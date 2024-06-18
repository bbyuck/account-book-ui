import "@melloware/coloris/dist/coloris.css";
import { coloris, init, close } from "@melloware/coloris";
import { useEffect } from "react";
import "components/style/ColorPicker.css";

export default function ColorPicker() {
  useEffect(() => {
    init();
    coloris({
      el: "#color-picker",
      parent: ".color-picker-container",
      wrap: false,
      rtl: false,
      theme: "large",
      themeMode: "light",
      format: "hex",
      alpha: false,
      forceAlpha: false,
      swatchesOnly: false,
      focusInput: false,
      selectInput: false,
      clearButton: false,
      clearLabel: "Clear",
      closeButton: false,
      closeLabel: "Close",
      swatches: [
        // "#264653",
        // "#2a9d8f",
        // "#e9c46a",
        // "rgb(244,162,97)",
        // "#e76f51",
        // "#d62828",
        // "navy",
        // "#07b",
        // "#0096c7",
        // "#00b4d880",
        // "rgba(0,119,182,0.8)",
      ],
      inline: true,
      defaultColor: "#000000",
      onChange: (color, input) => undefined,
    });

    console.log(coloris);
    return () => {};
  }, []);
  return (
    <div className="color-picker-container">
      <div id="color-picker">
        <input type="text" data-coloris style={{ display: "none" }}></input>
      </div>
    </div>
  );
}
