const express = require('express');
const { userMidleware, requireSingin } = require('../common-middleware/common-middleware');
const { addAddress, getAddress } = require('../contorls/adressController');

const router = express.Router();

router.post('/user/address/create', requireSingin, userMidleware, addAddress);
router.post('/user/getaddress', requireSingin, userMidleware, getAddress);

module.exports = router;
