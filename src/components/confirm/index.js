import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeConfirm } from "store/slice/clientInfo";

export default function AppConfirm() {
  const { confirm } = useSelector((state) => state.clientInfo);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeConfirm());
  };

  const handleConfirm = () => {
    if (confirm.onConfirmed()) {
      dispatch(closeConfirm());
    }
  };

  return (
    <Dialog
      open={confirm.open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogTitle id="responsive-dialog-title">{confirm.title}</DialogTitle>
      <DialogContent>
        <div style={{ color: "gray", whiteSpace: "pre-wrap" }}>
          {confirm.message}
        </div>
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
