// Import express:
const express = require("express");

// Create an express server:
const router = express.Router();

// Install npm package for validating name, email, etc. and import it:
const { body, validationResult } = require("express-validator");

// Install and import npm package for hhshing and salting password:
const bcrypt = require("bcrypt");

// Install and import npm package for authenticating user:
const jwt = require("jsonwebtoken");

// Import middlewate function:
let authenticateuser = require("../middleware/authenticateuser");

const User = require("../models/User");
// const { json } = require('express')
// require("dotenv").config();

// Route 1: Create a user using POST '/api/auth/createuser'
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Express-validator will validates requests and catch/send any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({
        success,
        errors: errors.array(),
      });
    }
    try {
      // Check if email already exists
      let user = await User.findOne({ email: req.body.email });
      if(user) {
        success = false;
        return res.status(400).json({
          success,
          error: "This email already exists.",
        });
      }

      // Hash the password using bcrypt:
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      console.log(secPass, salt);

      // Create user which returns complete user object as a json file and saves to NongoDB:
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      console.log(user);

      // Fetch user.id from above user object and store in a data object:
      const data = {
        user: { id: user.id },
      };
      console.log(data);

      // A user sign-up will create an authToken it takes data(i.e'userid') and secret key for token creation(its the syntax) //as it takes userid(every auth token is unique for that particular user id)
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      console.log(authToken);
      res.json({ success, authToken });

      //   res.json({msg: req.body})
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Interval server error occured");
    }
    //we wont use promises as we are using async/await, but WHYY?Google
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    //   res.json({error: err.message})});
  }
);

/* Route 2: Authenticate a user using POST '/api/auth/login' endpoint. 
Take email and password from user and validate by express validator and send an async (request,response) */
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    // Express-validator will validates requests and catch/send any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Take email and password from user and send it to server in req.body:
    const { email, password } = req.body;
    try {
      // Find email in database and return user object
      let user = await User.findOne({ email });

      // If no user email exists, return error
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please log in with correct credentials.",
        });
      }
      console.log(user);

      // Compare password entered by user with user.password in database using bcrypt.compare() function
      const passwordCompare = await bcrypt.compare(password, user.password);

      // If password doesnt match, return error
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please log in with correct credentials.",
        });
      }

      // Get user id
      const data = {
        user: { id: user.id },
      };

      // Send JWT Token when logging in. authToken is like a session id for a particular user
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({
        success,
        authToken,
      });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send("Interval server error occured");
    }
  }
);

//Route 3: Get details of user who has logged using POST '/api/auth/getuser' endpoint. Call the middleware function and then the async req.
router.post("/getuser", authenticateuser, async (req, res) => {
  try {
    // Take user id //we fetched 'userId' from authToken and initialized it to {req.user} in fetchuser() func
    let userId = req.user.id;

    // Find user by userId and fetch all data except password(-password)
    const user = await User.findById(userId).select("-password");

    // Send the user data as a response:
    res.send(user);
  } catch (error) {
    // console.error(error.message);
    res.status(500).send("Interval server error occured");
  }
});

module.exports = router;
