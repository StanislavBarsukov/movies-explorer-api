const { messageError } = require('../utils/messageError');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? messageError.INTERNAL_SERVER : err.message;
  res.status(statusCode).send({ success: 'неудачно', message });
  next();
};

module.exports = { errorHandler };
