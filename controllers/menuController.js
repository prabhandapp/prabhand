const Menu = require('../models/menuModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.allMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.find({});
  res.status(200).json({
    count: menu.length,
    success: 'success',
    data: { menu },
  });
});

exports.categoryMenu = catchAsync(async (req, res, next) => {
  const menuCategory = await Menu.find({ category: req.params.category });
  res.status(200).json({
    count: menuCategory.length,
    success: 'success',
    data: { menuCategory },
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: 'success',
    data: { updatedMenu },
  });
});

exports.addMenu = catchAsync(async (req, res, next) => {
  const newMenu = await Menu.create(req.body);
  res.status(200).json({
    success: 'success',
    data: {
      newMenu,
    },
  });
});

exports.deleteMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);
  console.log(menu);
  res.status(204).json({
    success: 'success',
    data: null,
  });
});
