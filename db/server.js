const mysql = requirw('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root'
    password: 'Red&Blue2001$$$',
    database:'Employee-Database-Tracker',
});

module.exports = db;