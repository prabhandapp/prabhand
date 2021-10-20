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
