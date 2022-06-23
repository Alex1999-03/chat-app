import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import NavBarMenu from "./NavBarMenu";

export default function NavBar() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const onSignIn = () => {
    navigate("/signin");
  };

  const onSignUp = () => {
    navigate("/signup");
  };

  const onChat = () => {
    navigate("/chat");
  };

  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "#EEE" }}>
              ChatApp
            </Link>
          </Typography>

          {auth && (
            <Button color="inherit" onClick={onChat}>
              Chat
            </Button>
          )}

          {!auth && (
            <Button color="inherit" onClick={onSignIn}>
              Sign In
            </Button>
          )}

          {!auth && (
            <Button color="inherit" onClick={onSignUp}>
              Sign Up
            </Button>
          )}

          {auth && (
           <NavBarMenu />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
