const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

// Middleware to parse incoming JSON requests
app.use(express.json());
// Mount the school-related routes at the root path
app.use('/', schoolRoutes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>School API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f0f4f8;
          color: #333;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        h1 {
          font-size: 3rem;
          color: #0070f3;
        }
        a{
          padding: 5px 10px;
          background-color: skyblue;
          color: white;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to School API!</h1>
      <h2><a href='https://github.com/negativeInteger/school-api'>Github Repository</a></h2>
    </body>
    </html>
  `);
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
