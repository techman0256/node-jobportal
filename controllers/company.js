const { default: mongoose } = require('mongoose');
const User = require('../model/user');
// const userData = require('../model/userData');
const mongodb = require('mongodb');
const Company = require('../model/organization');


exports.getDashboard = (req, res) => {
    const companyId = req.params.companyId;
    
    Company.findOne({_id: new mongodb.ObjectId(companyId)}, (err, results) => {
        res.send(results);

    })
}

exports.getCrtDashboard = (req, res) => {
    // res.send('fill this form to create a dashboard');
    // render a form to company dashboard details
    console.log(req.params.companyId);
    res.render('org-reg', {userId: req.params.companyId});
}

exports.postDashboard = (req, res) => {
    const companyId = req.params.companyId;
    // console.log(req.body.position);
    console.log(req.body);
    const crtProfile = new Company({
        companyName: req.body.name,
        companyId: new mongodb.ObjectId(req.params.companyId),
        officialWebsite: req.body.website,
        description: req.body.description,
        position: req.body.position,
    })

    crtProfile.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(crtProfile);
            console.log('company dashboard created');
            // res.send(crtProfile)
            res.redirect('/work/dashboard/'+companyId);
        }   

    })
}


exports.putEditDashboard = (req, res) => {
    Company.updateOne({companyId: new mongodb.ObjectId(req.params.companyId)},{
        $set: {
            companyName: req.body.companyName,
            // userId: new mongodb.ObjectId(req.params.companyId),
            officialWebsite: req.body.officialWebsite,
            description: req.body.description,
            position: req.body.position, 
        }
    } ,(err, results) => {
        res.send('profile updated');
        console.log(results);
    })
}