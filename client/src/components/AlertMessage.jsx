import { Dialog } from "@mui/material";

const AlertMessage = ({children, open }) => {
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        {children}
    </Dialog>
  );
};

export default AlertMessage