const User = require('../models/User');
const catchAsync = require('../middleware/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Route:       GET /api/users
 * Description: Get all users
 * Access:      Private/Admin
 */
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  return res
    .status(200)
    .json({ success: true, count: users.length, data: users });
});

/**
 * Route:       GET /api/users/:id
 * Description: Get single user
 * Access:      Private/Admin
 */
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('Usuário não encontrado', 404));
  }

  return res.status(200).json({ success: true, data: user });
});

/**
 * Route:       POST /api/users
 * Description: Create a new user
 * Access:      Private/Admin
 */
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  return res.status(201).json({ success: true, data: newUser });
});

/**
 * Route:       PUT /api/users/:id
 * Description: Update user
 * Access:      Private/Admin
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('Usuário não encontrado', 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, data: user });
});

/**
 * Route:       DELETE /api/users/:id
 * Description: Delete user
 * Access:      Private/Admin
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('Usuário não encontrado', 404));
  }

  await user.remove();

  return res.status(200).json({ success: true, data: {} });
});
