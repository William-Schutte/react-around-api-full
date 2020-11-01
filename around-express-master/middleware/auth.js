const jwt = require('jsonwebtoken');
const LoginError = require('../errors/login-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new LoginError('Authorization Required');
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret_key');
  } catch (err) {
    const err2 = new LoginError('Authorization Verification Failure');
    next(err2);
  }

  req.user = payload;
  next();
};

// This function verifies the jwt sent in the headers of the request sent by the client. If
// the token is verified, the user property of the request is assigned the payload of the token.
