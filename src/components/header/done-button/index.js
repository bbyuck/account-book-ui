import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { IconButton } from "@mui/material";

export default function HeaderDoneButton({ onClick, complete }) {
  return (
    <IconButton onClick={onClick} disabled={!complete}>
      <AssignmentTurnedInIcon color={complete ? "primary" : "disabled"} />
    </IconButton>
  );
}
