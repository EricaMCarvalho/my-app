const Order = require('../models/Order');
const catchAsync = require('../middleware/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

// TODO: Test routes

/**
 * Route:       GET /api/orders
 * Description: Get all orders
 * Access:      Private/Admin
 */
exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({ success: true, count: orders.length, orders });
});

/**
 * Route:       POST /api/orders
 * Description: Create a new order
 * Access:      Private
 */
exports.createOrder = catchAsync(async (req, res, next) => {
  const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } =
    req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new ErrorResponse('Sua sacola está vazia', 400));
  }

  const order = Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({ success: true, order });
});
