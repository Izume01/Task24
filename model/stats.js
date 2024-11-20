const mongoose = require('mongoose');

const StatsSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required : true
    },
    totalTasks : {
        type : Number, 
        default : 0
    },
    completedTasks : {
        type : Number, 
        default : 0
    },
    pendingTasks : {
        type : Number, 
        default : 0
    },
    weekdays : {
        type : Array, 
        default : [0,0,0,0,0,0,0]
    }
})

const Stats = mongoose.model('Stats' , StatsSchema)

module.exports = Stats;










