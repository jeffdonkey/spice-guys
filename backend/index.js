// DEPENDENCIES
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

connectDB();
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

//Routes:
app.get('/api', (req, res) => {
    res.send('<h1>Spice Guys App</h1>');
});

// User routes:
const userRoutes = require('./routes/auth');
app.use('/api/auth', userRoutes);

// Spices routes
const spicesRoutes = require('./routes/spices');
app.use('/api/spices', spicesRoutes);

app.listen(process.env.PORT, () => {
    console.log(`SPICE GUYS backend listening on port ${process.env.PORT}`);
});