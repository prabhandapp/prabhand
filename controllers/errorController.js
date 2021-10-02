const AppError = require('../utils/appError');

const validationHandler = (err) => {
  const message = Object.values(err.errors)
    .map((el) => el.message)
    .join(',');
  return new AppError(message, 400);
};

const handleDuplicateField = (err) => {
  const message = `Field with Duplicate value is found : ${err.keyValue}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };

  console.log(err.statusCode, err.message);
  console.log(`Test -- ${err.message.includes('js.map')}`);
  if (err.name === 'ValidationError') error = validationHandler(error);
  else if (err.code === 11000) error = handleDuplicateField(error);
  // else if (err.statusCode === 401) err.statusCode = 401;
  // else if (err.message.includes('js.map')) err.code = err.code;
  else error.message = 'Something Went Wrong !!!';

  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Error',
      message: err.message,
      isLog: err.statusCode === 401 ? true : false,
    });
  }

  //   res.status(error.statusCode).json({
  //     status: error.status,
  //     message: error.message,
  //   });
};
