// Import Mongoose
const mongoose = require("mongoose");

// Define the schema for the Users model
const userSchema = new mongoose.Schema({

    userId:{
        type: String,
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },
    // Email of the user
    email: {
        type: String,
        required: true,
        // Each email must be unique
        unique: true,
    },
    // Password of the user
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    specialization: {
        type: String
    },
    medicalCondition: {
        type: String
    },
    address: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
});

// Create and export the Users model
module.exports = mongoose.model("users", userSchema);
