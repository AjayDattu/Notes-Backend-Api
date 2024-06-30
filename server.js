require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/user')
// Middleware to parse JSON bdies
app.use(express.json());
app.use(cors());
// Middleware to log request paths and methods
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/todo', workoutRoutes);
app.use('/api/user', userRoutes);
// Connect to the database and start the server
mongoose.connect(process.env.MONG_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening at port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Connection failed", error);
    });
