import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cancelConfirm, procConfirm } from "store/slice/clientInfo";

export default function AppConfirm() {
  const { confirm } = useSelector((state) => state.clientInfo);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(cancelConfirm());
  };

  const handleConfirm = () => {
    dispatch(procConfirm());
  };

  return (
    <Dialog
      open={confirm.open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{confirm.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{confirm.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirm}>
          {confirm.confirmLabel}
        </Button>
        <Button onClick={handleClose} autoFocus>
          {confirm.cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
