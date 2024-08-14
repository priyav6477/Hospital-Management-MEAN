const express = require('express')
const cors = require('cors');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userRoutes = require('./routes/user-route');
const reportRoutes = require('./routes/report-route');
require("dotenv").config();
const bodyParser = require('body-parser');

const users=require('./models/users')
const reports=require('./models/report')

app.use(cors());
app.use(bodyParser.json());


mongoose
    .connect(
        process.env.MONGO_URI
    ).then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(userRoutes);
app.use(reportRoutes);

module.exports = app;
