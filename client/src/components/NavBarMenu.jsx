import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Typography,
  } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NavBarMenu() {
    const { signOut } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const onProfile = () => {
      navigate("/profile");
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
        <IconButton
          size="large"
          title="Open Settings"
          color="inherit"
          onClick={handleOpenUserMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key={"perfil"} onClick={onProfile}>
            <Typography textAlign="center">Perfil</Typography>
          </MenuItem>
          <MenuItem key={"signout"} onClick={signOut}>
            <Typography textAlign="center">Cerrar Sesión</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
}