const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const UserRouter = require('./routes/users');
const CardRouter = require('./routes/cards');
const { newUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^(https?:\/\/)(www\.)?([\w\d\-.$])+[a-z]{2,10}\/?(([a-z\d\W_-]{2,})*([#]$)?)?/),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  newUser,
);

app.use(auth);
app.use('/users', UserRouter);
app.use('/cards', CardRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT);
