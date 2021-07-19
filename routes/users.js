const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(authenticateToken, isAdmin, getUsers)
  .post(authenticateToken, isAdmin, createUser);

router
  .route('/:id')
  .get(authenticateToken, isAdmin, getUser)
  .put(authenticateToken, isAdmin, updateUser)
  .delete(authenticateToken, isAdmin, deleteUser);

module.exports = router;
