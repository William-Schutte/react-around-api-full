const routes = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

routes.get('/', getUser);

routes.patch('/me', bodyParser.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), updateUser);
routes.patch('/me/avatar', bodyParser.json(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = routes;

/* REFERENCE NOTES
routes = A mini-application capable of performing middleware and routing functions
fs = A node.js module that enables interacting with files. Was initially using this module
  to read static data files to test Express.js functionality. Since removed.
bodyParser = A node.js module for parsing data from request bodies, JSON in this case, adds
  parsed JSON to req.body property to be used in middleware function.
routes.get = Executes the given middleware function when an HTTP GET request is sent to path
*/
