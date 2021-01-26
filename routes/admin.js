//to handle the creation of the product
const path = require('path');
const express = require('express');
//const rootDir = require('../utilities/path');
const router = express.Router();
const adminController = require('../controllers/admin');
const products = [];


router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct); 

router.get('/products', adminController.getProducts);

module.exports = router;