const express = require("express"); // Importing Express framework
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const User = require("../models/User"); // Importing User model
const router = express.Router(); // Creating a router instance

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    // Generate salt for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const cryptedPass = await bcrypt.hash(req.body.password, salt);

    // Creating a new user with hashed password
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: cryptedPass,
    });

    // Save the new user to the database
    const userSaved = await newUser.save();
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Registering User !"); // Log success message
    res.status(200).json(userSaved._id); // Send success response with user ID
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Registering User !"); // Log error message
    res.status(500).json(err); // Send error response
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      // User not found
      console.log("\x1b[41m%s\x1b[0m", "[FAILED] User login !");
      res.status(400).json("Wrong username! or password");
    } else {
      // Validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        // Incorrect password
        console.log("\x1b[41m%s\x1b[0m", "[FAILED] User Login !");
        res.status(400).json("Wrong username! or password");
      } else {
        // Successful login
        console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] User Login !");
        res.status(200).json(user); // Send user data as response
      }
    }
  } catch (err) {
    // Error during login process
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Logging in with User !");
    res.status(500).json(err); // Send error response
  }
});

module.exports = router; // Export the router
