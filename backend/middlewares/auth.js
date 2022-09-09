const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  let payload;

  // по новой создал файл env на сервере и настроил, тест показал что ключ берется из env
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'test-secret-word' : JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
