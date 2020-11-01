const routes = require('express').Router();
const bodyParser = require('body-parser');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

routes.get('/', getCards);
routes.post('/', bodyParser.json(), createCard);
routes.delete('/:cardId', deleteCard);
routes.put('/:cardId/likes', likeCard);
routes.delete('/:cardId/likes', unlikeCard);

module.exports = routes;
