const routes = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

routes.get('/', getCards);

routes.post('/', bodyParser.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
    link: Joi.string().required().min(5),
  }),
}), createCard);
routes.delete('/:cardId', deleteCard);
routes.put('/:cardId/likes', likeCard);
routes.delete('/:cardId/likes', unlikeCard);

module.exports = routes;
