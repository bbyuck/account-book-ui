import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "store/slice/clientInfo";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function AppAlert() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector(
    (state) => state.clientInfo.alert
  );

  const handleClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        sx={{ width: "100vw" }}
        severity={type}
        variant={"outlined"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
