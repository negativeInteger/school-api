const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

// Middleware to parse incoming JSON requests
app.use(express.json());
// Mount the school-related routes at the root path
app.use('/', schoolRoutes);

app.get('/my-ip', async (req, res) => {
  try {
    const response = await fetch('https://ifconfig.me/ip');
    const ip = await response.text();
    res.json({ outboundIP: ip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get IP', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
// Start the Express server
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  }
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1); // Exit process if server fails to start
});
