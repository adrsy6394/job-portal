const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route for testing
app.get('/api', (req, res) => {
    res.json({ message: 'API is running...' });
});

// Mount routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/job-seeker', require('./routes/jobSeekerRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/recruiter', require('./routes/recruiterRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
