const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require('../controllers/admin');

//GET REQUEST FOR /admin 
router.get('/', adminController.getAdmin);







module.exports = router;

