const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');



const userCollection = require("../models/users");
const reportCollection = require("../models/report");


// Create a report for a patient
router.post('/addreport', async (req, res) => {
    try {
        const { patientId, doctorId, chiefComplaint, symptoms, medicalHistory, diagnosticTests, treatment, status } = req.body;

        // Check if patient and doctor exist
        const patient = await userCollection.findOne({ userId: patientId, userType: 'Patient' });
        const doctor = await userCollection.findOne({ userId: doctorId, userType: 'Doctor' });

        if (!patient || !doctor) {
            return res.status(404).json({ message: 'Patient or doctor not found' });
        }

        // Save report to the database
        const genId = uuidv4().substr(0, 12).toUpperCase();
        const createdDate = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

        const report = new reportCollection({
            reportId: "REP-"+genId,createdAt:createdDate,
            patientId, doctorId, chiefComplaint, symptoms, medicalHistory, diagnosticTests, treatment, status
        });
        const savedReport = await report.save();

        res.status(201).json({statusCode:200, message: 'Report created successfully', result: savedReport });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Get all reports
router.get('/reports', async (req, res) => {
    try {
        const allReports = await reportCollection.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'patientId',
                    foreignField: 'userId',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctorId',
                    foreignField: 'userId',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    _id: 1,
                    reportId:1,
                    patientId: 1,
                    chiefComplaint: 1,
                    symptoms: 1,
                    medicalHistory: 1,
                    diagnosticTests: 1,
                    treatment: 1,
                    status: 1,
                    'patientName': '$patient.username',
                    'doctorName': '$doctor.username'
                }
            }
        ]);
        res.status(200).json({statusCode:200,message:"Reports fetched successfully",result:allReports});
    } catch (error) {
        console.error('Error fetching all reports:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get reports by status
router.get('/reports/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const reportsByStatus = await reportCollection.aggregate([
            {
                $match: { status }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'patientId',
                    foreignField: 'userId',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctorId',
                    foreignField: 'userId',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    _id: 1,
                    reportId:1,
                    patientId: 1,
                    chiefComplaint: 1,
                    symptoms: 1,
                    medicalHistory: 1,
                    diagnosticTests: 1,
                    treatment: 1,
                    status: 1,
                    'patientName': '$patient.username',
                    'doctorName': '$doctor.username'
                }
            }
        ]);
        res.status(200).json({statusCode:200,message:"Reports fetched successfully",result:reportsByStatus});
    } catch (error) {
        console.error('Error fetching reports by status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/updateReports/status', async (req, res) => {
    try {
        const { reportId,status } = req.body;
        
        const updatedReport = await reportCollection.findOneAndUpdate(
            { reportId:reportId },
            { $set: { status } },
            { returnOriginal: false }
        );
        console.log(updatedReport)

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({ message: 'Report status updated successfully', report: updatedReport.value });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/reports/patient/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const patientReports = await reportCollection.aggregate([
            {
                $match: { patientId: patientId }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'patientId',
                    foreignField: 'userId',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'doctorId',
                    foreignField: 'userId',
                    as: 'doctor'
                }
            },
            {
                $unwind: '$doctor'
            },
            {
                $project: {
                    _id: 1,
                    patientId: 1,
                    reportId:1,
                    chiefComplaint: 1,
                    symptoms: 1,
                    medicalHistory: 1,
                    diagnosticTests: 1,
                    treatment: 1,
                    status: 1,
                    'patientName': '$patient.username',
                    'doctorName': '$doctor.username'
                }
            }
        ]);
        res.status(200).json({statusCode:200,message:"Reports fetched successfully",result:patientReports});
    } catch (error) {
        console.error('Error fetching reports by patient ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
