const express = require('express');
const router = express.Router();
const path = require('path');
const user = require('../controllers/user');
const auth = require('../controllers/auth');
const User = require('../model/user');
const userData = require('../model/userData');
const mongodb = require('mongodb');


router.get('/my/:userId', (req, res, next) => {
    // console.log('params index loading');
    
    userData.findOne({userId: mongodb.ObjectId(req.params.userId)}, (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(results.name);
            console.log(typeof(results.name));
            // By now we've got fetch the students details in this results object
            
            // res.send(results.name);
            res.render('index', {
                name: results.name, 
                email: results.email,
                number: results.contact_no,
                age: results.age, 
                gender: results.gender,
                cpi: results.cpi,
                techstack: results.techstack,
                userId: req.params.userId
                
            });

        }
    })
});

router.get('/', (req, res) => {
    res.render('landing');

});

router.get('/student', (req, res) => {
    res.render('index', {name: null});
    // next();
});



router.get('/crtprofile/:userId', user.getProfile);
router.post('/crtprofile/:userId', user.postProfile);

router.get('/my/:userId/dashboard', user.dashboard);
router.get('/my/:userId/company', user.getCompany)

router.get('/my/crtprofile/:userId', user.getEditProfile);

router.post('/my/edtprofile/:userId', user.putEditProfile);

module.exports = router;