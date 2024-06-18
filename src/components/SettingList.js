import { List } from "@mui/material";

export default function SettingList({ children }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>{children}</List>
  );
}
