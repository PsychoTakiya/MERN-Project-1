const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello Home - Router");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  if (!name || !email || !phone || !password || !confirmPassword) {
    return res
      .status(422)
      .json({ error: "The fields are not filled properly" });
  }
  try {
    const response = await User.findOne({ email: email });

    if (response) {
      return res.status(422).json({ error: "Registered Email already exists" });
    } else if (password != confirmPassword)
      return res
        .status(422)
        .json({ error: "Password does not match the confirm password" });
    else {
      const user = new User({
        name,
        email,
        phone,
        password,
        confirmPassword,
      });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "The fields are not filled properly" });
  }
  try {
    const response = await User.findOne({ email: email });
    console.log(response);
    if (response) {
      const isMatch = await bcrypt.compare(password, response.password);
      const jwt = await response.generateAuthToken();
      console.log(jwt);
      res.cookie("jwtToken", jwt, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) res.status(400).json({ error: "Invalid Credentials" });
      else res.json({ message: "user login successfully" });
    } else res.json({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
  console.log("About Page");
});

router.get("/getData", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "Please fill the contact form" });
    } else console.log("contact filled");

    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "User Contact Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  console.log("Logged Out");
  res.clearCookie("jwtToken", { path: "/" });
  res.status(200).send("User Logged Out");
});

// router - promises
//   .post("/register", (req, res) => {
//     //   console.log(req.body);
//     //   res.json({message: req.body})

//     const { name, email, phone, password, confirmPassword } = req.body;
//     if (!name || !email || !phone || !password || !confirmPassword) {
//       return res
//         .status(422)
//         .json({ error: "The fields are not filled properly" });
//     }

//     User.findOne({ email: email })
//       .then((userExist) => {
//         if (userExist) {
//           return res
//             .status(422)
//             .json({ error: "User Registration already exists" });
//         }
//         const user = new User({
//           name,
//           email,
//           phone,
//           password,
//           confirmPassword,
//         });
//         user
//           .save()
//           .then(
//             res.status(201).json({ message: "user registered successfully" })
//           );
//       })
//       .catch((err) => res.status(500).json({ error: "Failed to register" }));
//   })

module.exports = router;
