const express = require('express');
const {
  updateUser, getUser,
} = require('../controllers/user');
const { updateUserJoi } = require('../middlewares/validationJoi');

const users = express.Router();

users.get('/me', getUser);
users.patch('/me', updateUserJoi, updateUser);

module.exports = { users };
