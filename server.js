const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'karol', // Update with your username
  password: 'root123', // Update with your password
  database: 'todo',
  port: '3306'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  connection.query(sql, (error, results) => {
      if (error) throw error;
      res.json(results);
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, priority, status } = req.body;
  const sql = 'INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)';
  connection.query(sql, [title, description, priority, status], (error, results) => {
      if (error) throw error;
      res.status(201).json({id: results.insertId, ...req.body});
  });
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});

