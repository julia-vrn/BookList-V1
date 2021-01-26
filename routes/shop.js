//what the user sees
const express = require('express');
//onst path = require('path');
//const rootDir = require('../utilities/path');
//const adminData = require('./admin');
const router = express.Router();
const shopController = require('../controllers/shop');
//mini express app pluggable to another express app

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout );
router.get('/orders', shopController.getOrders);

module.exports = router;

