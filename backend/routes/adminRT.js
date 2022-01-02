const express = require('express');
const router = express.Router();

const adminCntrlr = require('../controller/adminCntrlr');

router.get('/', adminCntrlr.saveAuthToken);


module.exports = router;