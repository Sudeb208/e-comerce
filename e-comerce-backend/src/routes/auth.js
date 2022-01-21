const express = require('express');
const { requireSingin } = require('../common-middleware/common-middleware');
const { signup, signin } = require('../contorls/userController');
const { customSignUpValidator, isRequestValid, customSignInValidator } = require('../validator/validator');

const router = express.Router();

router.post('/user/signin', customSignInValidator, isRequestValid, signin);

// signup user

router.post('/user/signup', customSignUpValidator, isRequestValid, signup);

// protect route

router.post('/profile', requireSingin, (req, res) => {
  res.status(200).json({ profile: 'hello world' });
});

module.exports = router;
