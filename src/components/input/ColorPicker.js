import { useEffect, useRef, useState } from "react";
import { MuiColorInput } from "mui-color-input";

import "components/style/ColorPicker.css";
import styled from "@emotion/styled";

const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiInputBase-input {
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
  }
  & .MuiButtonBase-root {
    width: 40px;
    height: 40px;
    border-radius: 20px 20px 20px 20px;
    position: relative;
  }
  & .MuiInputBase-root fieldset {
    display: none;
  }
`;

export default function ColorPicker({
  value = "#ffffff",
  setValue,
  selectColor,
}) {
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [initialValue, setInitialValue] = useState(value);

  return (
    <MuiColorInputStyled
      isAlphaHidden
      format="hex"
      value={value}
      onFocus={() => {
        selectColor(value, initialValue);
      }}
      onChange={handleChange}
      size="large"
      variant="outlined"
    />
  );
}
