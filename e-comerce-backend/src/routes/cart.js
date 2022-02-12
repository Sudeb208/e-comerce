/* eslint-disable consistent-return */
const express = require('express');
const {
  requireSingin,
  userMidleware,
} = require('../common-middleware/common-middleware');
const { addItemToCart, getCartItems, removeCartItems } = require('../contorls/cartController');

const router = express.Router();

router.post('/user/addtocart', requireSingin, userMidleware, addItemToCart);
router.post('/user/getCartItems', requireSingin, userMidleware, getCartItems);
// new update
router.post(
  '/user/cart/removeItem',
  requireSingin,
  userMidleware,
  removeCartItems,
);

module.exports = router;
