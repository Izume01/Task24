const express = require('express');
const task = require('../model/tasks');

const router = express.Router();


router.post('/task' , async(req, res) => {
    const {title , description , priority } = req.body;

    if(!title || !description || !priority){
    
        return res.status(400).json({message: 'Please fill all fields'});
    }

    try {
        const newTask = new task({
            title,
            description,
            priority,
            createdBy:req.user._id
        })

        await newTask.save();
    } catch (error) {
        return res.status(401).json({message: 'Error in creating task'});
    }
})

router.get('/task' , async (req, res) => {
    try {
        const task = await task.find({createdAt :  req.user._id});
    } catch (error) {
        
    }
})

router.put('/task/:id' , async(req ,res) => {
    const {title , description , priority} = req.body;
    await task.findByIdAndUpdate(req.params.id , {title , description , priority});
    res.json({message: 'Task updated'});
})

router.delete('/task/:id' , async(req , res) => {
    await task.findByIdAndDelete(req.params.id);
    res.json({message: 'Task deleted'});
});

module.exports = router; 