require('dotenv').config();


const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectID, ObjectId } = require('bson');

exports.postSignIn = (req, res, next) => {
    try {
        // console.log(req.body);
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
                        res.redirect('/my/' + userId);
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
                    next();
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
        
        const crtUser =  new User({email: req.body.email, crtPwd: hash});
        crtUser.save((err) => {
            if (err) {
                console.log(err);   
            }
        });

        console.log(crtUser._id);
        const userId = crtUser._id.toString();
        console.log(userId);
        res.status(201);
        res.redirect('/crtprofile/'+userId);
    }
    catch {
        res.status(500).send();
    }
}