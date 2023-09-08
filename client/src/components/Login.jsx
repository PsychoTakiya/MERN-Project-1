import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { UserContext } from "../App";
import LoginPic from "../assets/Login.png";

function Login() {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.error === "Invalid Credentials" || !data) {
      console.log("invalid login");
    } else {
      dispatch({ type: "USER", payload: true });
      console.log("successful login");
      navigate("/");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          p: 5,
          width: "100%",
          maxWidth: "550px",
          backgroundColor: "#f4efff",
        }}
        raised={true}
      >
        <CardContent sx={{ p: 0, mb: 1 }}>
          <Typography
            sx={{ mb: 2, display: "flex", justifyContent: "center" }}
            variant="h4"
            color="initial"
          >
            Log In
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={LoginPic} alt="Account" style={{ height: "380px" }} />
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
            placeholder="Your Email"
            sx={{ m: 1, width: "80%" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            placeholder="Password"
            id="input-with-icon-textfield"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
          <Button variant="contained" onClick={loginUser}>
            Log In
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
