/**
 * @description Sets up and exports a MySQL connection pool using mysql2 and environment variables.
 */

const mysql = require('mysql2');
require('dotenv').config();

/**
 * Create a MySQL connection pool.
 * 
 * - `host`: The database server hostname (usually 'localhost' for local dev).
 * - `user`: MySQL user (usually 'root' for local dev).
 * - `password`: Password for the MySQL user.
 * - `database`: Name of the database to connect to.
 * - `waitForConnections`: Whether the pool should queue connection requests if none are available.
 * - `connectionLimit`: Maximum number of connections allowed in the pool.
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // DB_PORT for Production      
    user: process.env.DB_USER,           
    password: process.env.DB_PASSWORD,   
    database: process.env.DB_NAME,       
    waitForConnections: true,
    connectionLimit: 10, // max simultaneous connections
    ssl: {
    rejectUnauthorized: false,
  }
});

// Export the pool wrapped in a Promise API for async/await usage
module.exports = pool.promise();
