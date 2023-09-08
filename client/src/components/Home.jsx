import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import HomePagePic from "../assets/HomePage.png";

function Home() {
  const [userName, setUserName] = useState("");
  const [flag, setFlag] = useState(false);
  const callAboutPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUserName(data.name);
      setFlag(true);
      console.log(data);
    } catch (err) {
      console.log(err);
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
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={HomePagePic} alt="Account" style={{ height: "450px" }} />
      </div>
      <Typography sx={{ mb: 2 }} variant="h3" color="initial">
        Hello {flag ? userName : "User"}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="h5" color="initial">
        Welcome to this site
      </Typography>
    </div>
  );
}

export default Home;
