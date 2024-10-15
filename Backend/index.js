const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const topicsRouter = require("./routes/topics");
const leaderboardRoutes = require("./routes/leaderboard"); // Ensure consistent naming
const quizRoutes = require("./routes/quizRoutes");
const cors = require('cors');
const morgan = require('morgan'); // Import morgan for logging
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

// Middleware Initialization
app.use(express.json());
app.use(morgan('dev')); // Use morgan for logging requests

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Adjust according to your frontend port
    methods: ['GET', 'POST'],
    allowedHeaders: ['auth-token', 'Content-Type'],
    credentials: true, // If you need to handle credentials

}));

// Route Initialization
app.use('/api/auth', require('./routes/auth'));
app.use("/api/topics", topicsRouter);
app.use("/api/quiz", quizRoutes);
app.use("/api/leaderboard", leaderboardRoutes);


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Something broke!' }); // More informative error response
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server listening on port http://localhost:${port}`);
});
