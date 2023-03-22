// File to retrieve data from database
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mssql = require('mssql');

// Testing
// console.log(process.env.DB_SERVER);

// Define database configuration object
const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      encrypt: true, // Use encryption to protect data in transit
      trustServerCertificate: true // Accept self-signed certificates
    }
  };

// Create mssql client instance
const client = new mssql.ConnectionPool(config);
// Connect to database
client.connect(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('SUCCESS Connected to database.');
    }
});

module.exports = {
    mssql,
    client
};