import {
  Grid,
  Avatar,
  Paper,
  Box,
  TextField,
  Container,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AlertMessage from "../components/AlertMessage";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useFormik } from "formik";
import EditUserSchema from "../schema/EditUser.Schema";
import useGetUser from "../hooks/useGetUser";
import useEditUser from "../hooks/useEditUser";
import { useState } from "react";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const { user, setUser } = useGetUser();
  const { onEditUser } = useEditUser();

  const onSubmit = async (values) => {
    const editedUser = await onEditUser(values);

    if (!editedUser) {
      setOpen(true);
    } else {
      setUser(editedUser);
      handleDisable();
    }
  };

  const handleDisable = () => {
    setDisable((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    validationSchema: EditUserSchema,
    onSubmit: onSubmit,
  });

  return (
    <Container maxWidth={"xs"}>
      <Paper elevation={5}>
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Perfil
          </Typography>
          <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  name="firstName"
                  label="Nombre"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  disabled={disable}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="Apellido"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  disabled={disable}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type={"email"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={disable}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleDisable}
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3 }}
            >
              Editar
            </Button>
            <Button
              type={"submit"}
              fullWidth
              variant="contained"
              sx={{ my: 3 }}
              disabled={disable}
              color="primary"
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Paper>

      <AlertMessage open={open}>
        <DialogTitle id="alert-dialog-title">Mensaje</DialogTitle>
        <DialogContent>
          <DialogContentText>El email ya existe.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </AlertMessage>
    </Container>
  );
}
