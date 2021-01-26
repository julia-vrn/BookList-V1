//to handle the creation of the product
const path = require('path');
const express = require('express');
//const rootDir = require('../utilities/path');
const router = express.Router();
const productsController = require('../controllers/products');
const products = [];


router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct); 

router.get('/products');

module.exports = router;