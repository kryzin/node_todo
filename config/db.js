const mysql = require('mysql');
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your username
  password: '', // Update with your password
  database: 'todo_app'
});

