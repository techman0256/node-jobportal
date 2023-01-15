const express = require('express');
const router = express.Router();
const path = require('path');


exports.getAdmin = (req, res, next) => {
    console.log('admin');
    res.send('Admin page is here');
    alert("ALERT")
}





