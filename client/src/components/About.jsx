import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AccountPic from "../assets/UserProfile.png";

function About() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      // Extract only the desired fields from the response
      const { _id, name, email, phone } = data;
      const userDataArray = [
        { label: "Id", value: _id },
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
      ];

      setUserData(userDataArray);
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

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
            User Profile
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={AccountPic} alt="Account" style={{ height: "380px" }} />
          </div>
        </CardContent>

        <Box>
          {userData.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {item.label}:
              </Typography>
              <Typography variant="body1">{item.value}</Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </div>
  );
}

export default About;
