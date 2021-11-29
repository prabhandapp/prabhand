const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.feedback = catchAsync(async (req, res, next) => {
  // const data = {};
  const reviewData = Review.create(req.body);
  res.status(200).json({
    success: 'success',
    data: reviewData,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({}).sort({ reviewDate: -1 });
  if (req.originalUrl.startsWith('/api')) {
    res.status(200).json({
      success: 'success',
      data: reviews,
    });
  } else {
    req.reviews = reviews;
    res.locals.reviews = reviews;

    next();
  }
});
