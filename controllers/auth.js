require('dotenv').config();

const User = require('../model/user');

const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectID, ObjectId } = require('bson');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (typeof(token) == typeof(undefined)) {
        res.redirect('/');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err)  => {
        if (err) {
            res.redirect('/');
        }
        else {
            next();
        }
    })
}

exports.loginWithToken = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log('hello');
        console.log(token);
        if (typeof(token) == typeof(undefined)) {
            res.render('landing');
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)  => {
            if (err) {
                console.log('error came');
                console.log(err);
                res.render('landing');
            }
            else {
                const userId = decoded.userId
                console.log(userId);
                res.redirect('/my/' + userId);
            }
        })
    } catch (error) {
        console.log(error);
        res.render('landing');
    }
    
    
}

exports.postSignIn = (req, res, next) => {
    try {
        User.findOne({email: req.body.email}, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/auth/sign-in');
            }
            else {
                bcrypt.compare(req.body.password, result.crtPwd, (err, pass) => {
                   if (pass == true) {
                        
                        const userId = result._id.toString();
                        const payload = {userId: userId, email: result.email, usrType: result.usrType}
                        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 })

                        res.cookie("jwt", token, {
                            expiers: new Date(Date.now() + 3600000),
                            httpsOnly: true
                        })

                        if (req.query.orgs == 'true') {
                            res.redirect('/work/dashboard/'+ userId);
                        }
                        else {
                            console.log(token);
                            res.redirect('/my/' + userId);
                        }
                        
                    }
                    else {
                        // const window = new Window();
                        // prompt('Incorrect Password')
                        res.redirect('/auth/sign-in');                        
                        
                    }
                    // next();
                });
                
            }
        });

    }
    catch {
        // res.status(500).send();
        res.redirect('/auth/sign-in');
    }
}

exports.postSignup = (req, res) => {
    // get the data form the sign up form and encrypt using bycrypt and store it in the database
    try {
        // encrypting user password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log(typeof(req.query.orgs));
        
        //assign usrType a variable to check role whether it is student or company
        var usrType = 'student';
        if (req.query.orgs == 'true') {
            console.log('hi');
            usrType = 'organization';   
        }

        // create new instance of User object and then save it
        const crtUser =  new User({email: req.body.email, crtPwd: hash, usrType: usrType});
        crtUser.save((err) => {
            if (err) {
                console.log(err);   
            }
        });

        console.log('profile created successfully');
        console.log(crtUser);
        // res.status(201);
        
        const userId = crtUser._id.toString();
        const payload = {userId: userId, email: crtUser.email, usrType: crtUser.usrType}
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 2 })
        console.log(token);
        res.cookie("jwt", token, {
            expiers: new Date(Date.now() + 120000),
            httpsOnly: true
        })


        if (req.query.orgs == 'true') {
            console.log('redirected in work');   
            res.redirect('/work/crtDashboard/'+userId);
        }
        else {
            res.redirect('/crtprofile/'+userId);       
        }
        
    }
    catch {
        console.log('err');
        res.status(500).send();
    }
}

// exports.postOrfSignup = ()