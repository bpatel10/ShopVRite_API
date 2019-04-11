var express = require('express');
var router = express.Router();
var customerHandler = require('../shopvrite/controllers/customerController');

/* GET home page. */
router.get('/getCustomerTotal',customerHandler.getCustomerPoints);
router.post('/scanQRCode',customerHandler.scanQRCode);

module.exports = router;