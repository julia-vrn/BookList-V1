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

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;