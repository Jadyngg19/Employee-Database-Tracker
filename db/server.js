const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Red&Blue2001$$$',
    database:'employee_database_tracker_db',
});

  module.exports = db;