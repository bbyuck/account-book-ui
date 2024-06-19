import { List } from "@mui/material";

export default function MenuList({ children, subheader }) {
  return (
    <List
      subheader={subheader}
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      {children}
    </List>
  );
}
