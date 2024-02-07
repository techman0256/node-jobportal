const express = require('express');
const router = express.Router();
const path = require('path');
const user = require('../controllers/user');
const auth = require('../controllers/auth');
const User = require('../model/user');
const userData = require('../model/userData');
const mongodb = require('mongodb');
const https = require('https');

// miscllaneous routes (outside the server)
const getSerpApi = (req, resp, next) => { 
    console.log('in serp api');
    
    const search = req.query.serach;
    console.log(search);
    const apireq = 'https://serpapi.com/search.json?engine=google_jobs&q='+search+'&hl=en&api_key='+process.env.SERP_API_KEY
    
    console.log(apireq);
    https.get(apireq ,
     (res) => {
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        // console.log(res.json().then(results => {
        //     console.log(results);
        // }));

        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });
      
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            
            const jobs = jsonData.jobs_results;
            console.log((jobs.length));
            let i = 0;
            jobs.forEach(ele => {
                // ele.job_id = i;
                if (ele.thumbnails == null) {
                    ele
                }
                // console.log(ele.company_name, ele.job_id);
            });

            resp.render('searchResults', {jobs: jobs});

            
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
    
    
}); 
    
    // resp.render('searchResults', {name: null, userId: null})
    // next();
}

router.get('/desc', (req, res) => {
    res.render('searchResultsCompany');
})

router.get('/my/:userId', auth.authenticateToken, (req, res, next) => {    
    // find basic user data from the database
    userData.findOne({userId: mongodb.ObjectId(req.params.userId)}, (err, results) => {
        if (err) {
            console.log('hello');
            console.log(err);
            res.redirect('/auth/sign-in');
        }
        else {
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

// Try to login with the token
router.get('/',  auth.loginWithToken);


router.get('/student', (req, res) => {
    res.render('index', {name: null});
    // next();
});

router.get('/crtprofile/:userId', auth.authenticateToken, user.getProfile);
router.post('/crtprofile/:userId', auth.authenticateToken, user.postProfile);

router.get('/my/:userId/dashboard', auth.authenticateToken, user.dashboard);
router.get('/my/:userId/company', auth.authenticateToken, user.getCompany)
router.get('/my/:userId/search', auth.authenticateToken, user.getsearchOnGoogle, (req, res) => {
    console.log(req.query);
});

router.get('/my/:userId/query', getSerpApi);

router.get('/my/crtprofile/:userId', auth.authenticateToken, user.getEditProfile);
router.post('/my/edtprofile/:userId', auth.authenticateToken, user.putEditProfile);



module.exports = router;