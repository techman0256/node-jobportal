const mongodb = require('mongodb');
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    email: String,
    crtPwd: String,
    // cfrmPwd: String
})


module.exports = mongoose.model('users', userSchema);