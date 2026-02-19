const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/tasks', taskRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('FlexiWork Backend API is running!');
});

module.exports = app;
