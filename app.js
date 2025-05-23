const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

// Middleware to parse incoming JSON requests
app.use(express.json());
// Mount the school-related routes at the root path
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 3000;
// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
