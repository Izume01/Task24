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

UserSchema.pre('save' ,async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hashSync(this.password , 10)
    next();
})

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User' , UserSchema);

module.exports = User; 