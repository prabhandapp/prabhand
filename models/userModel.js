const mongoose = require('mongoose');
const validator = require('validator');
const bCrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },

  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter correct email'],
  },

  photo: {
    type: String,
    default: 'profile.jpg',
  },

  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: [6, 'Password should be minimum 6 character'],
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, 'Please provide your confirm password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password does not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bCrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// userSchema.methods.passwordCheck = async function (
//   _inputPassword,
//   _dbPassword
// ) {
//   return await bCrypt.compare(_inputPassword, _dbPassword);
// };

userSchema.methods.fun = async function (candidatePassword, userPassword) {
  return await bCrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
