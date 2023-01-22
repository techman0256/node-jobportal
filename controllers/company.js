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
    res.send('fill this form to create a dashboard');
    // render a form to company dashboard details
}

exports.postDashboard = (req, res) => {
    const companyId = req.params.companyId;
    const crtProfile = new Company({
        companyName: req.body.companyId,
        userId: new mongodb.ObjectId(req.params.companyId),
        officialWebsite: req.body.officialWebsite,
        description: req.body.description,
        postition: req.body.postition
    })

    crtProfile.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('company dashboard created');
        }   
    })
}


exports.putEditDashboard = (req, res) => {
    company.updateOne({_id: new mongodb.ObjectId(companyId)},{
        $set: {
            companyName: req.body.companyName,
            // userId: new mongodb.ObjectId(req.params.companyId),
            officialWebsite: req.body.officialWebsite,
            description: req.body.description,
            postition: req.body.postition, 
        }
    } ,(err, results) => {
        res.send('profile updated');
        console.log(results);
    })
}