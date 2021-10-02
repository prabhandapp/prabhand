const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const cookieOptions = {
  expires: new Date(Date.now + 90 * 24 * 60 * 60 * 1000),
  secure: true,
  httpOnly: true,
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //Check if both fields are provided
  if (!username || !password) {
    return next(new AppError('Please provide username and password'));
  }

  //Find Username in DB
  const user = await User.findOne({ username }).select('password');

  //Verify Username and password
  if (!user || !(await user.fun(password, user.password))) {
    return next(new AppError('Invalid username or password'));
  }

  const token = signToken(user._id);
  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    success: 'success',
    token,
  });

  //   next();
});

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    confirmPassword: req.body.confirmPassword,
  });
  const token = signToken(newUser._id);
  res.status(200).json({
    success: 'success',
    token,
    data: newUser,
  });
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
      return next(new AppError('Invalid TOken. Please Log in', 401));
    }
    //To be accessed in view
    res.locals.user = user;
  } else {
    return next(new AppError('You are not Logged in. Please Log in', 401));
  }

  next();
});
