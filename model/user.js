const mongodb = require('mongodb');
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    email: String,
    crtPwd: String,
    usrType: {
        type: String,
        enum: ['admin', 'student', 'organization']
    } 
    // cfrmPwd: String
})


module.exports = mongoose.model('users', userSchema);