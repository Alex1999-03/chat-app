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
  DialogActions
} from "@mui/material";
import AlertMessage from "../components/AlertMessage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SignUpSchema from "../schema/SignUp.Schema";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { signUp } = useAuth();

  const onSignUp = async (values) => {
    const result = await signUp(values);
    if (result) {
      navigate("/chat", { replace: true });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: onSignUp,
  });

  return (
    <Container maxWidth={"xs"}>
      <Paper elevation={5}>
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Apellido"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={"password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type={"submit"}
              fullWidth
              variant={"contained"}
              sx={{ my: 6 }}
            >
              Registrar
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
