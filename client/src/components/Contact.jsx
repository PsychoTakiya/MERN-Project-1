import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import ContactPic from "../assets/ContactUs.png";

function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callAboutPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    console.log("test!", data);
    if (!data) {
      console.log("message not sent");
    } else {
      console.log("message sent");
      setUserData({ ...userData, message: "" });
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
      <Card sx={{ p: 5, backgroundColor: "#f4efff" }} raised={true}>
        <CardContent sx={{ p: 0, mb: 2 }}>
          <Typography
            sx={{ display: "flex", justifyContent: "center" }}
            variant="h4"
            color="initial"
          >
            Get In Touch
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={ContactPic} alt="Account" style={{ height: "380px" }} />
          </div>
        </CardContent>

        <Box>
          <TextField
            sx={{ mr: 2 }}
            id="input-with-icon-textfield"
            placeholder="Your Name"
            onChange={handleInputs}
            name="name"
            value={userData.name}
            variant="outlined"
          />
          <TextField
            sx={{ mr: 2 }}
            id="input-with-icon-textfield"
            placeholder="Your Email"
            onChange={handleInputs}
            name="email"
            value={userData.email}
            variant="outlined"
          />

          <TextField
            placeholder="Your Phone Number"
            onChange={handleInputs}
            name="phone"
            value={userData.phone}
            id="input-with-icon-textfield"
            variant="outlined"
          />
        </Box>
        <Box sx={{ mt: 2, mb: 2 }}>
          <TextField
            id="standard-multiline-static"
            multiline
            fullWidth={true}
            onChange={handleInputs}
            name="message"
            value={userData.message}
            rows={4}
            placeholder="Enter your message"
            variant="outlined"
          />
        </Box>

        <CardActions>
          <Button variant="contained" onClick={submitDetails}>
            Send Message
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Contact;
