const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions

// Define a schema for pins using mongoose.Schema
const PinSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true, // User name is required
    },

    title: {
      type: String,
      required: true, // Title is required
      min: 3, // Minimum length of 3 characters
    },
    rating: {
      type: Number,
      required: true, // Rating is required
      min: 1, // Minimum rating value is 1
      max: 5, // Maximum rating value is 5
    },
    lat: {
      type: Number,
      required: true, // Latitude is required
    },
    lon: {
      type: Number,
      required: true, // Longitude is required
    },
    desc: {
      type: String,
      required: true, // Description is required
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the Pin model based on the PinSchema
module.exports = mongoose.model("Pin", PinSchema);
