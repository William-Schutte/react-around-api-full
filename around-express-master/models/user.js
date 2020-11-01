const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const LoginError = require('../errors/login-err');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return RegExp(/^(https?):\/\/(www\.)?[\w-@:%\+~#=]+[.][\.\w/\-?#=&~@:()!$\+%]*$/gm).test(v);
      },
      message: 'Invalid Image URL',
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Invalid Email',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new LoginError('Incorrect email/password'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new LoginError('Incorrect email/password'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);

/* REFERENCE NOTES
Schema's are used by mongoose to validate data being sent to the database. Schemas must first
be turned into a model to be applied to entries.

Note in the password field the use of the select property. When false, this field will not be
returned on any query of the user. To get the password when searching documents, append the
.select('+password') method to the Mongoose method as in findUserByCredentials() above.

The statics property allows a function/method that exists directly on the user model instead
of just on the schema to which it belongs.
*/
