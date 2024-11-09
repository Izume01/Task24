const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title : {
        type : String, 
        required : true, 
    },
    description  : {
        type: String, 
        required : true, 
    },
    priority : {
        type : String, 
        enums : ['High' , 'Medium' , 'Low'],
        default : 'Medium'
    },
    createdAt : {
        type : Date , 
        default: Date.now()
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User' ,
        required : true
    }, 
    Checked : {
        type : Boolean, 
        default : false
    }    
})

const Task = mongoose.model('Tasks' , TaskSchema) 

module.exports = Task; 