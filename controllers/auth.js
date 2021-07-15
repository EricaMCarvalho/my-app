const catchAsync = require('../middleware/catchAsync.js');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Todos os campos são obrigatórios', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Email ou senha inválido', 400));
  }

  const isMatch = user.isValidPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Email ou senha inválido', 400));
  }
  sendTokenResponse(user, 200, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const existingEmail = await User.findOne({ email }).lean();

  if (existingEmail) {
    return next(
      new ErrorResponse('Esse endereço de email já está em uso', 400)
    );
  }

  if (!password || password.length < 8) {
    return next(
      new ErrorResponse('Sua senha deve conter no mínimo 8 caracteres')
    );
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
});
