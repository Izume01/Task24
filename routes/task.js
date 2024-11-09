const express = require('express');
const { toggleTaskStatus } = require('../controller/taskController');
const Task = require('../model/tasks');
const router = express.Router();

// Create a new task
router.post('/task', async (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const newTask = new Task({
            title,
            description,
            priority,
            createdBy: req.user._id // Assumes user is authenticated
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in creating task' });
    }
});

// Fetch all tasks of a user
router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Get a specific task by task ID
router.get('/task/getTask/:taskid', async (req, res) => {
    const { taskid } = req.params;
    try {
        const task = await Task.findById(taskid);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving task' });
    }
});

// Update task (title, description, priority)
router.put('/task/:id', async (req, res) => {
    const { title, description, priority } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, priority }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated', updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete task
router.delete('/task/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

router.put('/task/:taskId/toggle', toggleTaskStatus);

module.exports = router;
