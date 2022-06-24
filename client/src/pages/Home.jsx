import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const onSignIn = () => {
    navigate("/signin");
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        bgColor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Chat App
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
          pellentesque justo. Curabitur in est eget mi pellentesque eleifend.
          Proin massa ante, fermentum pulvinar eros vel, elementum condimentum
          diam.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button onClick={onSignIn} variant="contained">Iniciar Sesión</Button>
          <Button onClick={onSignUp} variant="outlined">Registrar</Button>
        </Stack>
      </Container>
    </Box>
  );
}
