const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userCollection = require("../models/users");

//Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, age, address, gender, userType, medicalCondition, specialization,mobileNumber } = req.body;
        // Check if username already exists
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4().substr(0, 12).toUpperCase();
        // Save user to database
        const user = new userCollection({
            userId:userId,
            username, password:hashedPassword, email, age, address, gender, userType, medicalCondition, specialization,mobileNumber
        });
        const savedUser = await user.save();
        res.status(201).json({statusCode:200, message: 'User registered successfully',result:savedUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by username
        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.json({statusCode:400, message: 'Invalid username or password' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({statusCode:400, message: 'Invalid username or password' });
        }
        res.status(200).json({statusCode:200, message: 'Login successful',result:user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users by userType
router.get('/users/:userType', async (req, res) => {
    try {
        const { userType } = req.params;
        // Find users by userType
        const users = await userCollection.find({ userType });
        console.log(users)
        res.status(200).json({statusCode:200,message:"Users fetched successfully",result:users});
    } catch (error) {
        console.error('Error fetching users by userType:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;