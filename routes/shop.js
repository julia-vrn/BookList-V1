//what the user sees
const express = require('express');
//onst path = require('path');
//const rootDir = require('../utilities/path');
//const adminData = require('./admin');
const router = express.Router();
const productsController = require('../controllers/products');
//mini express app pluggable to another express app

router.get('/', productsController.getProduct);
router.get('/products');
router.get('/cart');
router.get('/checkout');

module.exports = router;

