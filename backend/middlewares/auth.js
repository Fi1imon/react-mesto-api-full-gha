const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/Unauthorized');

const { JWT_SECRET = 'a652e70b96a631c629c08a0ec5f9cd811ebf2dcec53e131cfc7d97c0f1fce72d' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Unauthorized({ message: 'Необходима авторизация' }));
  }

  let payload;

  try {
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized({ message: 'Необходима авторизация' }));
  }

  req.user = payload;
  next();
};
