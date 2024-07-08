import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function InputConfirm({
  open,
  setOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirmed,
  onCanceled,
}) {
  const handleConfirm = async () => {
    if (await onConfirmed()) {
      console.log("confirmed?");
      setOpen(false);
    }
  };

  const handleClose = () => {
    onCanceled();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div style={{ color: "gray" }}>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirm}>
          {confirmLabel}
        </Button>
        <Button onClick={handleClose} autoFocus>
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
