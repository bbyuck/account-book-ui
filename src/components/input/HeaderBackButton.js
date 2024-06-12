import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTransition } from "store/slice/clientInfo";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function HeaderBackButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        sessionStorage.setItem("buttonBack", true);
        dispatch(setPageTransition("pop"));
        navigate(-1, {
          replace: true,
        });
      }}
    >
      <NavigateBeforeIcon />
    </IconButton>
  );
}
