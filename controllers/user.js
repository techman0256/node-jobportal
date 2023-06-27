const { default: mongoose } = require('mongoose');
const User = require('../model/user');
const userData = require('../model/userData');
const Company = require('../model/organization')
const mongodb = require('mongodb');

exports.getsearchOnGoogle = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    
    userData.findOne({userId: new mongodb.ObjectId(userId)}, (err, result) => {
        if (!err) {
            res.render('searchOnGoogle', {userId: req.params.userId, name: result.name});
        }
        else {
            res.render('searchOnGoogle', {userId: req.params.userId, name : null});
        }
    
    })
}

exports.getProfile = (req, res, next) => {
    console.log(req.params);
    res.render('reg', {userId: req.params.userId, edit: 'false'});
}
exports.postProfile = (req, res, next) => {
    console.log(req.body);
    console.log(req.params.userId);
    console.log('in post profile');
    User.findOne({_id: new mongodb.ObjectId(req.params.userId)}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            const crtProfile = new userData({
                name: req.body.name,
                email: result.email,
                userId: new mongodb.ObjectId(req.params.userId),
                contact_no: req.body.contact_no,
                age: req.body.age,
                gender: req.body.gender,
                cpi: req.body.cpi,
                batch: req.body.batch,
                techstack: req.body.techstack
               });
       
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

            // Need a ejs template to render dashboard...
        }
    })

    
}


// It should render a page with students details for editing them
exports.getEditProfile = (req, res) => {
    // console.log('hi');
    const userId = req.params.userId;
    console.log('hello lodu');
    console.log(typeof(req.query.edit));
    

    if (req.query.edit == 'true') {
        userData.findOne({userId: userId}, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
                res.render('reg', {
                    name: result.name,
                    number: result.contact_no,
                    age: result.age,
                    gender: result.gender,
                    cpi : result.cpi,
                    techstack: result.techstack,
                    userId: req.params.userId,
                    edit: req.query.edit
                });
    
            }
        })
    }


}

exports.putEditProfile = (req, res) => {
    console.log('putting editing profile');
    console.log(req.body.name);
    userData.updateOne({userId:new mongodb.ObjectId(req.params.userId)},{
        $set: {
            name: req.body.name,
            contact_no: req.body.contact_no,
            age: req.body.age,
            gender: req.body.gender,
            cpi: req.body.cpi,
            techstack: req.body.techstack
        }
    },(err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            // res.send({result})
            res.redirect('/my/'+req.params.userId)

            // Need a ejs template to render dashboard...
        }
    })
}

exports.getCompany = (req, res) => {
    const userId = req.params.userId;
    
    userData.findOne({userId: new mongodb.ObjectId(userId)}, (err, result) => {
        console.log(result);
        Company.find({reqcpi: { $lt : result.cpi} }, (err, companies) => {
            console.log(companies[0]);
            res.render('showCompany', {name: result.name, userId: userId, jobs: companies})
        })
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