//what the user sees
const express = require('express');
//onst path = require('path');
//const rootDir = require('../utilities/path');
//const adminData = require('./admin');
const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);
router.get('/products/', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
// //router.get('/checkout', shopController.getCheckout );
router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

module.exports = router;

