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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useFormik } from "formik";
import SignInSchema from "../schema/SignIn.Schema";

export default function SignIn() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { signIn } = useAuth();

  const onSignIn = async (values) => {
    const result = await signIn(values);
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
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: onSignIn,
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
            Sign in
          </Typography>

          <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
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
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>

      <AlertMessage open={open}>
        <DialogTitle id="alert-dialog-title">Mensaje</DialogTitle>
        <DialogContent>
          <DialogContentText>Email o Contraseña invalidos.</DialogContentText>
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
