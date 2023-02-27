require('dotenv').config({ path: './config.env' });
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // Allows us to accept data in the req.body
app.use(cors());

// Load Routes
const spiceRoutes = require('./routes/spiceRoutes');
const auth = require('./routes/auth');
const private = require('./routes/private');

// Use Routes
app.use("/api/spices", spiceRoutes);
app.use('/api/auth', auth);
app.use('/api/private', private);

app.use(errorHandler); // Error handler must be last piece of middleware

const port = process.env.PORT || 5001;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});