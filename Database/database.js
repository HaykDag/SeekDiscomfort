const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  }).promise();

  module.exports = {pool}