const mongoose = require('mongoose')
const dotenv = require('dotenv')
const e = require('express')

dotenv.config()

const connectDB = async () => {
    try {    
        await mongoose.connect(process.env.MONGO_URL)
        console.log("CONNECTED TO THE MONGODB");
        
    } catch (error) {
        console.log("Error connecting to the MongoDB" , error);
    }
}

module.exports=  connectDB; 