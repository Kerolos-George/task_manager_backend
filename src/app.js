// Initialize Elastic APM at the very top of the file
const apm = require('elastic-apm-node').start({
    serviceName: 'taskmanger', // Replace with your app's name
    serverUrl: 'http://localhost:8200', // APM Server URL
    environment: process.env.NODE_ENV || 'development', // Optional: environment (e.g., production, development)
    logLevel: 'info', // Optional: adjust log verbosity (debug, info, warn, error)
});

// Regular imports after initializing APM
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const swaggerDocs = require('../config/swagger');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware to log request and response details
app.use((req, res, next) => {
    const transaction = apm.currentTransaction; // Get the current APM transaction
    if (transaction) {
        // Add request details to APM
        transaction.addLabels({
            method: req.method,
            url: req.originalUrl,
            query: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
        });
        
    }

    // Intercept the response to log the body
    const originalSend = res.send;
    res.send = function (body) {
        if (transaction) {
            transaction.addLabels({
                responseBody: typeof body === 'string' ? body : JSON.stringify(body),
                statusCode: res.statusCode,
            });
        }
        originalSend.apply(res, arguments); // Call the original `res.send`
    };

    next();
});

// Swagger documentation
swaggerDocs(app);

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    // Capture errors with APM
    apm.captureError(err);

    // Send error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
