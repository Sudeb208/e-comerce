/* eslint-disable consistent-return */
const { check, validationResult } = require('express-validator');

exports.customSignUpValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('Frist name is required'),
  check('lastName')
    .notEmpty()
    .withMessage('Last name is requird'),
  check('email')
    .isEmail()
    .withMessage('valid email is requird'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password neeeded minimum 6 word'),
];
exports.isRequestValid = (req, res, next) => {
  const error = validationResult(req);
  if (error.array().length > 0) {
    return res.status('400').json({ error: error.array()[0].msg });
  }
  next();
};
exports.customSignInValidator = [
  check('email')
    .isEmail()
    .withMessage('valid email is requird'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('password neeeded minimum 6 word'),
];
