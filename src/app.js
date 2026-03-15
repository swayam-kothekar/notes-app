const express = require('express');
const logger = require('./middleware/logger');
const notesRouter = require('./routes/notes');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.APP_ENV || 'development',
    version: process.env.APP_VERSION || '1.0.0',
    uptime: Math.round(process.uptime()),
  });
});

// Routes
app.use('/notes', notesRouter);

module.exports = app;
