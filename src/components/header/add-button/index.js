import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";

export default function HeaderAddButton({ targetPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goForward = (url) => {
    dispatch(setPageTransition("push"));
    navigate(url);
  };
  return (
    <IconButton onClick={() => goForward(targetPage)}>
      <AddIcon color="primary" />
    </IconButton>
  );
}
