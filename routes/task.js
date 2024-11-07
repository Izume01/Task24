const express = require('express');
const task = require('../model/tasks');
const router = express.Router();

router.post('/task', async (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const newTask = new task({
            title,
            description,
            priority,
            createdBy: req.user._id
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Error in creating task' });
    }
});

router.get('/task', async (req, res) => {
    try {
        const tasks = await task.find({ createdBy: req.user._id });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

router.get('/task/:id', async (req, res) => {
    try {
        const userid = req.params.id;
        console.log(userid);    
        
        const displaytask = await task.find({createdBy: userid});  
        if (!displaytask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(displaytask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving task' });
    }
});

router.get('/task/getTask/:taskid', async (req, res) => {
    try {
        const taskid = req.params.taskid;
        console.log(taskid);    
        
        const displaytask = await task.find({_id: taskid});  
        if (!displaytask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(displaytask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving task' });
    }
})

router.put('/task/:id', async (req, res) => {
    const { title, description, priority } = req.body;
    try {
        await task.findByIdAndUpdate(req.params.id, { title, description, priority });
        res.json({ message: 'Task updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

router.delete('/task/:id', async (req, res) => {
    try {
        await task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
