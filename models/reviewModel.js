const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  place: String,
  message: String,
  reviewDate: {
    type: String,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
