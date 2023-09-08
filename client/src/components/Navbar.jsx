import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  const ToggleMenu = () => {
    if (state) {
      return (
        <>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => navigate("/logout")}>
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </>
      );
    }
  };
  return (
    <div>
      <AppBar
        position="sticky"
        color="primary"
        sx={{ mb: "3%", backgroundColor: "#532b88" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            APG
          </Typography>
          <ToggleMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
