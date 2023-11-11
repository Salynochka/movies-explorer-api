const limit = require('express-rate-limit');

const limiter = limit({
  windowMs: 1 * 60 * 1000, // за 10 минут 10 * 60 * 1000
  max: 100000, // можно совершить максимум 20 запросов с одного IP
  fireImmediately: true,
});

module.exports = limiter;
