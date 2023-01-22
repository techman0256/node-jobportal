const express = require('express');
const router = express.Router();
const path = require('path');
const company = require('../controllers/company');

router.get('/dashboard/:companyId', company.getDashboard)
router.get('/getcrtDashboard/:companyId', company.getCrtDashboard)

router.post('/crtDashboard/:companyId', company.postDashboard)
router.put('/crtDashboard/:companyId', company.putEditDashboard)


module.exports = router;