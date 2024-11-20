const task = require('../model/tasks');
const stats = require('../model/stats');

const getStats = async (req, res) => {
    try {
        console.log('Fetching tasks and stats for user:', req.user._id);

        const tasks = await task.find({ createdBy: req.user._id }) || [];

        let stat = await stats.findOne({ user: req.user._id });
        if (!stat) {
            console.log('No stats found for user, initializing stats');
            stat = new stats({
                user: req.user._id,
                totalTasks: 0,
                completedTasks: 0,
                pendingTasks: 0,
                weekdays: Array(7).fill({
                    totalTasks: 0,
                    completedTasks: 0,
                }),
            });
        }

        let completed = 0;
        let pending = 0;

        tasks.forEach(taskItem => {
            if (taskItem.Checked === true) { 
                completed++;
                console.log('Completed count:', completed);
            } else {
                pending++;
                console.log('Pending count:', pending);
            }
        });

        const day = new Date().getDay();

        stat.weekdays[day] = {
            totalTasks: tasks.length,
            completedTasks: completed,
        };

        stat.totalTasks = tasks.length;
        stat.completedTasks = completed;
        stat.pendingTasks = pending;

        await stat.save();

        console.log('Stats calculated:', {
            total: stat.totalTasks,
            completed: stat.completedTasks,
            pending: stat.pendingTasks,
        });

        // Return stats
        res.status(200).json({
            total: stat.totalTasks,
            completed: stat.completedTasks,
            pending: stat.pendingTasks,
        });

    } catch (error) {
        console.error('Error in getStats:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const weekdays = async (req, res) => {
    try {
        const stat = await stats.findOne({ user: req.user._id });
        if (!stat) {
            return res.status(400).json({ error: 'No stats found' });
        }

        if (stat.weekdays.length === 0) {
            return res.status(400).json({ error: 'No weekdays found' });
        }

        if (stat.weekdays.length !== 7) {
            return res.status(400).json({ error: 'Invalid weekdays' });
        }

        res.status(200).send(stat.weekdays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStats, weekdays };
