const express = require('express');
const router = express.Router();
const path = require('path');

exports.get404 = (req, res, next) => {
    res.render('/error/404.ejs');
}