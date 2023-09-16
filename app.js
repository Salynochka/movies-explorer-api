// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

// Слушаем 3000 порт
const { PORT = 3000, filmBd = 'mongodb://localhost:27017/bitfilmsdb'} = process.env;

const app = express();

mongoose.connect(filmBd, {
  useNewUrlParser: true,
});

app.use(cors({
  origin: 'https://movies.weekend.nomoredomainsrocks.ru',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
