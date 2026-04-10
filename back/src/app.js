const express = require('express');
const cors = require('cors');
const bpsRouter = require('./routes/bps');
const presentationsRouter = require('./routes/presentations');
const settingsRouter = require('./routes/settings');
const { errorHandler } = require('./middleware/errors');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/bps', bpsRouter);
app.use('/api/presentations', presentationsRouter);
app.use('/api/settings', settingsRouter);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
