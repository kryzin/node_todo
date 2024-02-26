const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks ORDER BY priority DESC, deadline ASC', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Get a single task by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// Create a new task
router.post('/', (req, res) => {
    const task = req.body;
    db.query('INSERT INTO tasks SET ?', task, (error, results) => {
        if (error) throw error;
        res.status(201).send(`Task added with ID: ${results.insertId}`);
    });
});

// Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskUpdate = req.body;
    db.query('UPDATE tasks SET ? WHERE id = ?', [taskUpdate, id], (error, results) => {
        if (error) throw error;
        res.send('Task updated successfully.');
      });
  });
  
// Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (error, results) => {
      if (error) throw error;
      res.send('Task deleted successfully.');
  });
});

module.exports = router;
