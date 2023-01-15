require('dotenv').config();


const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postSignIn = (req, res) => {
    try {
        User.findOne({email: req.body.email}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result.crtPwd);
                bcrypt.compare(req.body.password, result.crtPwd, (err, pass) => {
                   if (pass == true) {
                    console.log(true);

                    res.redirect('/');
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
                })
                // console.log(result);
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

        res.status(201);
        res.redirect('/');
    }
    catch {
        res.status(500).send();
    }
}