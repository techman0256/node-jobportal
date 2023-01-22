require('dotenv').config();


const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectID, ObjectId } = require('bson');

exports.postSignIn = (req, res, next) => {
    try {
        console.log(req.body);
        User.findOne({email: req.body.email}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result.crtPwd);
                bcrypt.compare(req.body.password, result.crtPwd, (err, pass) => {
                   if (pass == true) {
                        console.log(true);
                        console.log(result._id);
                        const userId = result._id.toString();
                        console.log(typeof(userId));
                        if (req.query.orgs == 'true') {
                            res.redirect('/work/dashboard/'+ userId);
                        }
                        else {
                            res.redirect('/my/' + userId);
                        }
                        // res.send({username: result.email})
                        // res.render('index', {email: req.body.email})   
                        // const user = {email: req.body.email};
                        // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                        // res.json({accessToken: accessToken})
                    }
                    else {
                        // const window = new Window();
                        // prompt('Incorrect Password')
                        res.redirect('/auth/sign-in');
                        console.log(false);
                    }
                    // next();
                });
                
            }
        });

    }
    catch {
        res.status(500).send();
    }
}

exports.postSignup = (req, res) => {
    // get the data form the sign up form and encrypt using bycrypt and store it in the database
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(typeof(req.query.orgs));
        
        var usrType = 'student';
        if (req.query.orgs == 'true') {
            console.log('hi');
            usrType = 'organization';   
        }
        console.log(true);
        const crtUser =  new User({email: req.body.email, crtPwd: hash, usrType: usrType});
        
        console.log(crtUser._id);
        crtUser.save((err) => {
            if (err) {
                console.log(err);   
            }
        });
        console.log('profile created successfully');
        const userId = crtUser._id.toString();
        console.log(crtUser);
        res.status(201);
        if (req.query.orgs == 'true') {
            console.log('redirected in work');   
            res.redirect('/work/getcrtDashboard/'+userId);
        }
        else {
            res.redirect('/crtprofile/'+userId);       
        }
        
    }
    catch {
        res.status(500).send();
    }
}

// exports.postOrfSignup = ()