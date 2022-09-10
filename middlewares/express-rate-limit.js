const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'С этого IP создано слишком много аккаунтов, повторите попытку через 15 минут',
});

module.exports = { limiter };
