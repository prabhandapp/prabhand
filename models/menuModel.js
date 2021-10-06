const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Please provide item name'],
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide category name'],
    lowercase: true,
    enum: {
      values: [
        'curry',
        'roti',
        'rice',
        'dal',
        'sabzi',
        'biryani',
        'chinese',
        'starter',
        'sides',
      ],
      message:
        'Category should be either curry, roti, dal, rice, sabzi, biryani, chinese, starter, sides',
    },
  },

  price: {
    type: Number,
    required: [true, 'Please provide the price for item'],
  },

  qty: {
    type: Number,
    default: 0,
  },
});

const Menu = mongoose.model('Menus', menuSchema);
module.exports = Menu;
