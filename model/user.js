const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const UserSchema =new  mongoose.Schema({
    username : {
        type : String , 
        required : true , 
        unique : true
    },
    email : {
        type: String, 
        required: true, 
        unique : true
    },
    password : {
        type: String, 
        required : true
    }
})

UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});

UserSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User' , UserSchema);

module.exports = User; 