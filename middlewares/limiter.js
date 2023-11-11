const limit = require('express-rate-limit');

const limiter = limit({
  windowMs: 10 * 60 * 1000, // за 10 минут
  max: 100, // можно совершить максимум 20 запросов с одного IP
});

module.exports = limiter;
