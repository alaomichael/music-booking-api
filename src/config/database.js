// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     ssl: true, // Enable SSL
// });

// module.exports = pool;

const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true, // Enforce strict validation
        ca: fs.readFileSync('./src/certs/ca.pem').toString(),
    },
});

module.exports = pool;