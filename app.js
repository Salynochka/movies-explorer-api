// импорт dotenv для чтения .env
require('dotenv').config();

// импорт npm
const express = require('express');
const mongoose = require('mongoose');

// импорт middlewares
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

// импорт роута
const routes = require('./routes/index');

// слушаем 3001 порт и ссылку на БД
const { PORT = 3001, bitfilmsdb } = process.env;

// приложение на express
const app = express();

// подключение к БД
mongoose.connect(bitfilmsdb, {
  useNewUrlParser: true,
});

// подключение допуска запросов с фронта
app.use(cors({
  origin: 'https://movies.weekend.nomoredomainsrocks.ru',
  credentials: true,
}));

// безопасность
app.use(helmet());
app.use(limiter);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// logger запросов
app.use(requestLogger);

// роут
app.use(routes);

// logger ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованная обработка ошибок
app.use(errorHandler);

app.listen(PORT);
