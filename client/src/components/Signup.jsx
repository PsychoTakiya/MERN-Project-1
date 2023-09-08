import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CallIcon from "@mui/icons-material/Call";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import SignUpPic from "../assets/SignUp.png";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        confirmPassword,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      console.log("invalid registration");
    } else console.log("successful registration");
    navigate("/login");
  };

  console.log("🚀 ", user);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:'100%'
      }}
    >
      <Card
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "550px",
          backgroundColor: "#f4efff",
        }}
      >
        <CardContent sx={{ p: 0, mb: 1 }}>
          <Typography
            sx={{ mb: 2, display: "flex", justifyContent: "center" }}
            variant="h4"
            color="initial"
          >
            Sign Up
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={SignUpPic} alt="Account" style={{ height: "280px" }} />
          </div>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder="Your name"
            name="name"
            sx={{ m: 1, width: "80%" }}
            value={user.name}
            onChange={handleInputs}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            id="input-with-icon-textfield"
            placeholder="Your Email"
            name="email"
            sx={{ m: 1, width: "80%" }}
            value={user.email}
            onChange={handleInputs}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            sx={{ m: 1, width: "80%" }}
            id="input-with-icon-textfield"
            placeholder="Mobile Number"
            name="phone"
            value={user.phone}
            onChange={handleInputs}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            sx={{ m: 1, width: "80%" }}
            placeholder="Password"
            id="input-with-icon-textfield"
            name="password"
            value={user.password}
            onChange={handleInputs}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <TextField
            sx={{ m: 1, width: "80%" }}
            placeholder="Confirm your password"
            id="input-with-icon-textfield"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputs}
            required={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={submitData}>
            Register
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Signup;
