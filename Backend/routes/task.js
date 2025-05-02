const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task
router.post('/', async (req, res) => {
  try {
    const { text, status } = req.body;
    const newTask = await Task.create({ text, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Task creation failed', error: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Fetching tasks failed', error: error.message });
  }
});

// Update task status
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Task update failed', error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Task deletion failed', error: error.message });
  }
});


module.exports = router;
