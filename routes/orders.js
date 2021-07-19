const express = require('express');
const { getOrders, createOrder } = require('../controllers/orders');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(authenticateToken, isAdmin, getOrders)
  .post(authenticateToken, createOrder);

module.exports = router;
