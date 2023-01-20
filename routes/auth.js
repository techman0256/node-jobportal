const express = require('express');
const router = express.Router();
const path = require('path');


const auth = require('../controllers/auth');

/* User authentication process ******************************************************** */ 
//GET Method for sign-in page
router.get('/sign-in',(req, res, next) => {
    res.render('sign-in');
});

//GET method for sign-up page 
router.get('/sign-up', (req, res, next) => {
    res.render('sign-up');
})

//POST Method for sign-in
router.post('/sign-in', auth.postSignIn);

//POST method that registers new uses in the database
router.post('/sign-up', auth.postSignup);


/* company authentication code ******************************************************** */
router.get('/work-login',(req, res, next) => {
    res.send('work login')
});


// router.post


module.exports = router;