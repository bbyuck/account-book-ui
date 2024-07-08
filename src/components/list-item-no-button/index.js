import { ListItem } from "@mui/material";

export default function ListItemNoButton({ children }) {
  return (
    <ListItem sx={{ paddingLeft: "32px", paddingRight: "32px" }}>
      {children}
    </ListItem>
  );
}
