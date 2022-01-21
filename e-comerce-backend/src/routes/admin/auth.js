const express = require('express');
const { requireSingin } = require('../../common-middleware/common-middleware');
const { signin, signup, signout } = require('../../contorls/admin/adminController');
const { customSignUpValidator, isRequestValid } = require('../../validator/validator');

const router = express.Router();

router.post('/admin/signin', signin);

// signup user

router.post('/admin/signup', customSignUpValidator, isRequestValid, signup);

// signout user

router.post('/admin/signout', requireSingin, signout);

module.exports = router;
