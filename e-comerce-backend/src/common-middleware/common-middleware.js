/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

exports.requireSingin = async (req, res, next) => {
  try {
    const header = await req.headers.authorization;
    if (header) {
      const token = header.split(' ')[1];
      const user = await jwt.verify(token, process.env.JWTCODE);
      req.user = user;
    } else {
      return res.status('400').json({
        message: 'you need to sign up frist',
      });
    }
  } catch (error) {
    res.status('400').json({
      message: error.message,
    });
  }
  next();
};
// user middleware
exports.userMidleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'Access denied' });
  }
  next();
};

// admin midleware
exports.adminMidleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Access denied' });
  }
  next();
};
