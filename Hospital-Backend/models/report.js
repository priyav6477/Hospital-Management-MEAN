// Import Mongoose
const mongoose = require("mongoose");

// Define the schema for the Users model
const reportSchema = new mongoose.Schema({
    reportId: {
        type: String,
        required: true,
        unique: true,
    },
    patientId: {
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref: 'users', // Reference to the User model for patient
        required: true
    },
    doctorId: {
        type:String,
        // type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model for doctor
        required: true
    },
    createdAt: {
        type: String,
        // default: Date.now
    },
    chiefComplaint:{
        type:String,
        required: true
    },
    symptoms:{
        type:String,
        required: true
    },
    medicalHistory:{
        type:String,
        required: true
    },
    diagnosticTests:{
        type:String,
        required: true
    },
    treatment:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    },

})

module.exports = mongoose.model("reports", reportSchema);
