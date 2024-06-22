/* eslint-disable no-undef */ // Disable ESLint rule for undefined variables (useful for Node.js environment variables)
const express = require("express"); // Importing Express framework
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB interactions
const env = require("dotenv"); // Importing dotenv to manage environment variables
const pinRoute = require("./routes/pins.js"); // Importing pin routes
const userRoute = require("./routes/users.js"); // Importing user routes
const application = express(); // Creating an Express application instance

application.use(express.json()); // Middleware to parse JSON bodies in requests

env.config(); // Load environment variables from .env file

// Connect to MongoDB using connection string from environment variables
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Mongo DB connected !"); // Log success message for connection
  })
  .catch((err) => {
    console.log("\x1b[41m%s\x1b[0m", "[FAILED] Failed connection to MongoDB"); // Log error message for failed connection
  });

// Use pinRoute for requests to /api/pins
application.use("/api/pins", pinRoute);
// Use userRoute for requests to /api/users
application.use("/api/users", userRoute);

// Start the server and listen on port 7888
application.listen(7888, () => {
  console.log("\x1b[42m%s\x1b[0m", "[SUCCESS] Backend server started"); // Log success message for server start
});
