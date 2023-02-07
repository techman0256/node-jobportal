const express = require('express');
const router = express.Router();
const path = require('path');
const company = require('../controllers/company');

router.get('/', (req, res) => {
    res.render('company', {name: null});
});

router.get('/dashboard/:companyId', company.getDashboard)
// router.get('/getcrtDashboard/:companyId', company.getCrtDashboard)

router.get('/crtDashboard/:companyId', company.getCrtDashboard)
router.post('/crtDashboard/:companyId', company.postDashboard)
router.post('/edtDashboard/:companyId', company.putEditDashboard)


module.exports = router;