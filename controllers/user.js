const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {
  BadRequestError, UnauthorizedError, NotFoundError, ConflictError,
} = require('../error/index');
const { messageErrorUser } = require('../utils/messageError');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      next(new NotFoundError(messageErrorUser.NOT_FOUND_USER));
      return;
    }
    res.status(200).send({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      next(new NotFoundError(messageErrorUser.NOT_FOUND_USER));
      return;
    }
    res.status(200).send({
      user,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError(messageErrorUser.BAD_REQUEST_USER));
      return;
    }
    if (error.code === 11000) {
      next(new ConflictError(messageErrorUser.EMAIL_CONFLICT));
      return;
    }
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcryptJs.hash(password, 10);
    let user = await User.create({
      email,
      password: hash,
      name,
    });
    user = user.toObject();
    delete user.password;
    res.status(201).send({
      user,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError(messageErrorUser.BAD_REQUEST_USER));
      return;
    }
    if (error.code === 11000) {
      next(new ConflictError(messageErrorUser.BAD_CONFLICT));
      return;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError(messageErrorUser.UNAUTHORIZED_USER));
      return;
    }
    const passwordCheck = await bcryptJs.compare(password, user.password);
    if (!passwordCheck) {
      next(new UnauthorizedError(messageErrorUser.UNAUTHORIZED_USER));
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
      { expiresIn: '7d' },
    );
    res.status(200).send({
      token,
    });
  } catch (error) {
    next(error);
  }
};
