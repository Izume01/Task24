const task = require('../model/tasks');

const getStats = async(req , res) => {
    try {
        const tasks = await task.find({createdBy: req.user._id});
        if(!tasks){
            return res.status(400).send('No tasks found');
        }

        let completed = 0;
        let pending = 0;

        tasks.forEach(task => {
            if(task.checked ===true) {
                completed++;
            }
            else {
                pending++;
            }
        })
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getStats;