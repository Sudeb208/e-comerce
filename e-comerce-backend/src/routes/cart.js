/* eslint-disable consistent-return */
const express = require('express');
const { requireSingin, userMidleware } = require('../common-middleware/common-middleware');
const { addItemToCart } = require('../contorls/cartController');

const router = express.Router();

router.post('/user/addtocart', requireSingin, userMidleware, addItemToCart);

module.exports = router;
