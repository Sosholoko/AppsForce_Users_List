import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ConfirmModal(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOpen(props.showConfirm);
    console.log(props.showConfirm);
  }, [props.showConfirm]);

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={props.closeConfirm} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{"Delete User"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete {props.currentUser} ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.closeConfirm}>
          Cancel
        </Button>
        <Button onClick={props.onDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
