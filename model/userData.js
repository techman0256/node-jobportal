/* 
User should register thier given attributes when they signUp on website
name :
email:
contact no:
gender :
age :

*/

const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('../model/user');
const validator = require('validator')

const userRegSchema = mongoose.Schema({
    name: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'users',
        required: true
    },
    contact_no: String,
    age: Number,    
    gender: String
})



module.exports = mongoose.model('userReg', userRegSchema);