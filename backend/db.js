require('dotenv').config();
const mysql = require("mysql2");


const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_DATABASE;
const dbLimit = process.env.DB_CONNECTION_LIMIT;
const port = process.env.PORT;

//Creates the connection pool
const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    waitForConnections: true,
    connectionLimit: dbLimit,
    queueLimit: 0
});

module.exports = pool;