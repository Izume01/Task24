const Task = require('../model/tasks');

// Toggle task completion (mark as done / unmark)
const toggleTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Get task ID from URL parameters

        console.log(taskId);
        
        // Find the task by ID and toggle the Checked field
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Toggle the Checked field
        task.Checked = !task.Checked;

        // Save the updated task
        await task.save();

        const statusMessage = task.Checked ? 'Task marked as done' : 'Task unmarked as done';

        res.status(200).json({ message: statusMessage, task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { toggleTaskStatus };
