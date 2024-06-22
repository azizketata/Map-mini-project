const router = require("express").Router(); // Importing the Express Router

const Pin = require("../models/Pin"); // Importing the Pin model

// Create a new pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body); // Create a new Pin instance with the request body data
  try {
    const savedPin = await newPin.save(); // Save the new pin to the database
    res.status(200).json(savedPin); // Send a success response with the saved pin data
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Creating a new pin"); // Log success message with green background
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Creating a new pin"); // Log error message with red background
    res.status(500).json(err); // Send a failure response with the error
  }
});

// Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find(); // Retrieve all pins from the database
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Getting pins"); // Log success message with green background
    res.status(200).json(pins); // Send a success response with the pins data
  } catch (err) {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Getting pins"); // Log error message with red background
    res.status(500).json(err); // Send a failure response with the error
  }
});

module.exports = router; // Export the router
