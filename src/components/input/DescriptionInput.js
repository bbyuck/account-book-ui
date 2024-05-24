import DescriptionIcon from "@mui/icons-material/Description";

import { Box, TextField } from "@mui/material";

export default function DescriptionInput({
  style,
  label,
  description,
  onChange,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", ...style }}>
      <DescriptionIcon sx={{ color: "action.active", mx: 2, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        sx={{ mr: 2, width: "100%" }}
        variant="standard"
        label={label}
        type="text"
        value={description}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}
