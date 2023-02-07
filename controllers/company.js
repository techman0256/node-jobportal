const { default: mongoose } = require('mongoose');
const User = require('../model/user');
const path = require('path');
// const userData = require('../model/userData');
const mongodb = require('mongodb');
const Company = require('../model/organization');



exports.getDashboard = (req, res) => {
    const companyId = req.params.companyId;
    console.log(companyId);
    
    Company.findOne({companyId: new mongodb.ObjectId(companyId)}, (err, results) => {
        console.log(results);
        res.render('org-dash', {
            name: results.companyName.toString(),
            email: results.email.toString(),
            website: results.officialWebsite.toString(),
            desc: results.description.toString(),
            position: results.position.toString(),
            cpi: results.reqcpi.toString(),
            ctc: results.ctc,
            age: results.minage,
            companyId: results.companyId.toString(),
            edit: 'false'
        });
        
        
    })

}

exports.getCrtDashboard = (req, res) => {
    // res.send('fill this form to create a dashboard');
    // render a form to company dashboard details
    console.log(req.params.companyId);
    if (req.query.edit) {
        Company.findOne({companyId: new mongodb.ObjectId(req.params.companyId)}, (err, results) => {
            res.render('org-reg', {
                name: results.companyName,
                website: results.officialWebsite,
                desc: results.description,
                age: results.minage,
                cpi: results.reqcpi,
                position: results.position,
                ctc: results.ctc,
                edit: req.query.edit,
                userId: req.params.companyId
            })
     
        })
            
    }
    else {
        console.log('hi');
        res.render('org-reg', {userId: req.params.companyId, edit: 'false'});
    }
}

exports.postDashboard = (req, res) => {
    const companyId = req.params.companyId;
    // console.log(req.body.position);
    User.findOne({_id: new mongodb.ObjectId(req.params.companyId)} ,(err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(req.body);
            const crtProfile = new Company({
                companyName: req.body.name,
                companyId: new mongodb.ObjectId(req.params.companyId),
                email: results.email,   
                officialWebsite: req.body.website,
                description: req.body.description,
                position: req.body.positions,
                reqcpi: req.body.reqcpi,
                ctc: req.body.ctc,
                minage: req.body.minage
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
        
        
    })

}



exports.putEditDashboard = (req, res) => {
    Company.updateOne({companyId: new mongodb.ObjectId(req.params.companyId)},{
        $set: {
            companyName: req.body.name, 
            officialWebsite: req.body.website,
            description: req.body.description,
            position: req.body.positions,
            reqcpi: req.body.reqcpi,
            ctc: req.body.ctc,
            minage: req.body.minage
        }
    } ,(err, results) => {
        // res.send('profile updated');
        res.redirect('/work/dashboard/'+req.params.companyId)
        console.log(results);
    })
}