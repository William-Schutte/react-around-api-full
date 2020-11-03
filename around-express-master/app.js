// Express and Application Entry Point File
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/user.js');
const cardsRouter = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const corsOptions = {
  origin: /https:\/\/(www\.)?ws\.p15\.students\.nomoreparties\.site\S*/,
  allowedHeaders: ['Content-type', 'Authorization'],
};

app.use(cors(corsOptions));

// Logs all requests to the server
app.use(requestLogger);

// Server crash testing function for review
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('server will crash now');
  }, 0);
});

// These are the default routes and do not require a user to be logged in, i.e. auth
app.post('/signin', bodyParser.json(), login);
app.post('/signup', bodyParser.json(), createUser);

// The following routes WILL require a user to be logged in and authenticated
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRouter);
app.use('/cards', cardsRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    statusCode = 400;
    message = 'Invalid input. Validation error.';
  }
  res.status(statusCode).send({
    message: (statusCode === 500) ? 'Server error' : message,
  });
});

app.listen(PORT);

/* REFERENCE NOTES
express = The Express web framework for Node.js
path = A Node.js module for working with file/directory paths
mongoose = An Object Data Modeling (ODM) library for MongoDB and Node.js
app = An instance of Express giving access to methods for the server. This is a function designed
  to be passed to Node's HTTP servers as a callback to handle requests.
app.use = Mounts the specified middleware function at the given path
app.get = Routes an HTTP GET request to path with the given callback function
app.listen = Binds and listens for connections on the specified port (and host if given). Returns
  an http.Server object. Essentially 'turns on' the server.
*/
