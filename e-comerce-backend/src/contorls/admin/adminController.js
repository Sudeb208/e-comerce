/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/userModels');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    // eslint-disable-next-line consistent-return
    .exec(async (err, user) => {
      if (user) {
        return res.status('400').json({
          message: 'User already registered',
        });
      }
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        hash_password,
        userName: firstName + Math.random().toString(10),
      });
        // eslint-disable-next-line consistent-return
      newUser.save((error, data) => {
        // eslint-disable-next-line space-before-blocks
        if (error){
          console.log(error);
          return res.status(400).json({
            message: error,
          });
        }

        if (data) {
          return res.status(201).json({
            message: 'user signup sucessfully',
            user: data,
          });
        }
      });
    });
};

// sing in
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    // eslint-disable-next-line consistent-return
    .exec(async (error, user) => {
      if (error) {
        return res.status('400').json({
          message: error,
        });
      }
      if (user) {
        const {
          _id, firstName, lastName, email, role, fullName,
        } = user;
        const password = await bcrypt.compare(req.body.password, user.hash_password);
        if (password && user.role === 'admin') {
          const token = jwt.sign(
            // eslint-disable-next-line no-underscore-dangle
            { _id, role },
            process.env.JWTCODE,
            { expiresIn: '1d' },
          );
          res.cookie('token', token, { expiresIn: '1d' });
          res.status(200).json({
            token,
            user: {
              _id, firstName, lastName, email, role, fullName,
            },
          });
        } else {
          return res.status(400).json({
            message: 'invalid username or password',
          });
        }
      } else {
        return res.status('400').json({
          message: 'something went worng',
        });
      }
    });
};

exports.signout = async (req, res) => {
  try {
    await res.clearCookie('token');
    await res.status(200).json({
      message: 'sign out successfully',
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        message: 'something went worng',
      });
    }
  }
};
