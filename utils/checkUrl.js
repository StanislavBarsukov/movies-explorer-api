const validator = require('validator');

const validate = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(`${value} не валидная ссылка`);
};

module.exports = { validate };
