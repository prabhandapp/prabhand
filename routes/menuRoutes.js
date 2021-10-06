const express = require('express');

const menuController = require('../controllers/menuController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protected);

router.get('/all', menuController.allMenu);
router.route('/:category').get(menuController.categoryMenu);
router.route('/updateMenu/:id').patch(menuController.updateMenu);
router.post('/add', menuController.addMenu);
router.delete('/delete/:id', menuController.deleteMenu);

module.exports = router;
