const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');
const catchAsync = require('./catchAsync');
const User = require('../models/User');

exports.authenticateToken = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader &&
    authHeader.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(
      new ErrorResponse('Você não está autorizado a acessar esta página', 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (decoded.iss !== 'api.roma' || decoded.aud !== 'api.roma') {
      return next(
        new ErrorResponse('Você não está autorizado a acessar esta página', 403)
      );
    }

    req.user = await User.findById(decoded.sub);

    next();
  } catch (error) {
    return next(
      new ErrorResponse('Você não está autorizado a acessar esta página', 403)
    );
  }
});

exports.isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  return next(
    new ErrorResponse('Você não está autorizado a acessar esta página', 403)
  );
});
