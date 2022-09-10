const express = require('express');
const { users } = require('./users');
const { movies } = require('./movies');
const { auth } = require('../middlewares/auth');
const { signIn, signUp } = require('../middlewares/validationJoi');
const { login, createUser } = require('../controllers/user');
const { NotFoundError } = require('../error/index');
const { messageError } = require('../utils/messageError');

const routes = express.Router();

routes.post('/signin', signIn, login);
routes.post('/signup', signUp, createUser);

routes.use('/users', auth, users);
routes.use('/movies', auth, movies);

routes.all('*', auth, (req, res, next) => {
  next(new NotFoundError(messageError.NOT_FOUND_ERROR));
});

module.exports = { routes };
