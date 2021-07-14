const catchAsync = require('../middleware/catchAsync.js');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please add an email and a password', 400));
  }

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return next(ErrorResponse('Wrong email or password', 400));
  }

  const isMatch = user.isValidPassword(password);

  if (!isMatch) {
    return next(ErrorResponse('Wrong email or password', 400));
  }

  sendTokenResponse(user, 200, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const existingEmail = await User.findOne({ email }).lean();

  if (existingEmail) {
    return next(new ErrorResponse('Email already exists', 400));
  }

  if (!password || password.length < 8) {
    return next(
      new ErrorResponse('Password must be at least 8 characters long')
    );
  }

  const user = new User(userData);
  await user.save();

  sendTokenResponse(user, 201, res);
});
