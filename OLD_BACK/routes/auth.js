const express = require("express");
const router = express.Router(); // Create a router using express Router() method

// Import the auth controller functions to be passed into the HTTP routes below
const { register, login, forgotPassword, resetPassword } = require('../controllers/auth');

// HTTP routes for user requests:
// #1- POST request to register a new user; passes in the register function
router.route("/register").post(register); 

// #2- POST request to login a user; passes in the login function
router.route("/login").post(login); // POST request to login a user

// #3- POST request to send a password reset link to the user's email; passes in the forgotPassword function
router.route("/forgotpassword").post(forgotPassword);

// #4- PUT request to reset the user's password; passes in the resetPassword function
router.route("/resetpassword/:resetToken").put(resetPassword); // resetToken required in the URL


module.exports = router;