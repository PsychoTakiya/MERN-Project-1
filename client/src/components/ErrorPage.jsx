import React from "react";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={{display:'flex', alignItems:'center', flexDirection:'column', marginTop:'20%'}}>
      <Typography variant="h2" color="initial">
        404
      </Typography>
      <Typography variant="h4" color="initial">
        we are sorry, page not found!
      </Typography>
      <Typography variant="body2" color="initial" sx={{m:2}}>
        The page you are looking for is temporarily unavailable
      </Typography>

      <NavLink to="/">Back To Homepage</NavLink>
    </div>
  );
}

export default ErrorPage;
