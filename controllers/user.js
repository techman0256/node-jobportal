const { default: mongoose } = require('mongoose');
const User = require('../model/user');
const userData = require('../model/userData');
const mongodb = require('mongodb');

exports.getProfile = (req, res, next) => {
    console.log(req.params);
    res.render('reg', {userId: req.params.userId});
}
exports.postProfile = (req, res, next) => {
    console.log(req.body);
    console.log(req.params.userId);
    console.log('in post profile');
    const crtProfile = new userData({name: req.body.name, userId: new mongodb.ObjectId(req.params.userId), contact_no: req.body.contact_no,age: req.body.age,gender: req.body.gender});

    crtProfile.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('profile created');
            console.log(crtProfile);
            res.redirect('/my/' + req.params.userId);
        }
    });
}


// It should render a page with students details for editing them
exports.getEditProfile = (req, res) => {
    const userId = req.params.userId;
    if (req.query.edit == true) {
        userData.findOne({userId: userId}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.send({result})
    
                // Need a ejs template to render crtProfile with filled data...
            }
        })
    }
    // User.updateOne({})
    // const updatedProfile = 

}

exports.putEditProfile = (req, res) => {
    console.log('putting editing profile');
    console.log(req.body.name);
    userData.updateOne({userId:new  mongodb.ObjectId(req.params.userId)},{
        $set: {
            name: req.body.name,
            contact_no: req.body.contact_no,
            age: req.body.age,
            gender: req.body.gender
        }
    },(err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send({result})

            // Need a ejs template to render dashboard...
        }
    })
}

exports.dashboard = (req, res) => {
    const userId = req.params.userId;
    userData.findOne({userId: userId}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send({result})

            // Need a ejs template to render dashboard...
        }
    })
}