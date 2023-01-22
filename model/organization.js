const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('../model/user');
const validator = require('validator')

const companySchema = mongoose.Schema({
    companyName: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'users',
        required: true
    },
    officialWebsite: String,
    description: String,
    postition: String,

})



module.exports = mongoose.model('company', companySchema);