const { NODE_ENV, JWT_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notfound-err');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Error handling?
const createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;

  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then(((user) => res.status(201).send({ data: user })))
      .catch(next);
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_KEY : 'secret_key',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, { httpOnly: true });
      res.status(201).send({
        token,
        user: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError('User not found');
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError('User not found');
      }
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
  updateUser,
  updateAvatar,
};

/* REFERENCE NOTES
These controller functions, also called the last middleware (they do not call next() but instead
return responses), interact with the document models of the MongoDB database. The methods on the
model objects come from mongoose.

Bcrypt.js is a crypto module used here for hashing passwords.

The login handler uses the static user method for verifying user by email and pass, then creates
and creates a tokenized cookie (https://expressjs.com/en/api.html#res.cookie) based on the user's
_id.
*/
