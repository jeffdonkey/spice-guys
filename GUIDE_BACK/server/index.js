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
    res.send('<h1>Note Taking App</h1>');
});

// User routes:
const userRoutes = require('./routes/auth');
app.use('/api/auth', userRoutes);

// Notes routes
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

app.listen(process.env.PORT, () => {
    console.log(`STG Note-Taker backend listening on port ${process.env.PORT}`);
});