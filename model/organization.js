const mongodb = require('mongodb');
const mongoose = require('mongoose');
const User = require('../model/user');
const validator = require('validator')

const companySchema = mongoose.Schema({
    companyName: String,
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'users',
        required: true
    },
    email: String,
    officialWebsite: String,
    description: String,
    position: String,
    reqcpi: Number,
    ctc: Number,
    minage: Number
})



module.exports = mongoose.model('company', companySchema);