import { useEffect, useRef, useState } from "react";
import { MuiColorInput } from "mui-color-input";

import "components/style/ColorPicker.css";
import styled from "@emotion/styled";

const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiInputBase-input {
    display: none;
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

export default function ColorPicker({ value, setValue, selectColor }) {
  value = value ? value : "000000";

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [initialValue, setInitialValue] = useState(value);

  return (
    <MuiColorInputStyled
      isAlphaHidden
      format="hex"
      PopoverProps={{
        onClose: () => {
          selectColor(value, initialValue);
        },
      }}
      value={value}
      onChange={handleChange}
      size="large"
      variant="outlined"
    />
  );
}
