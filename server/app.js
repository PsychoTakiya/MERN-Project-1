const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");
// const User = require('./model/userSchema');
app.use(express.json());
app.use(require("./router/auth"));
const PORT = process.env.PORT;

const middleware = (req, res, next) => {
  console.log(
    "This acts as a middleware and this executes first then the next code from where it is called"
  );
  next();
};

app.get("/", (req, res) => {
  res.send("Hello Home");
});

// app.get("/about", middleware, (req, res) => {
//   res.send("Hello About");
//   console.log("About Page executed after middleware");
// });

app.get("/contact", (req, res) => {
  res.send("Hello Contact");
});

app.get("/signup", (req, res) => {
  res.send("Hello Sign Up");
});

app.get("/signin", (req, res) => {
  res.send("Hello Sign in");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
