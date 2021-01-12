//what the user sees
const express = require('express');
const path = require('path');
const rootDir = require('../utilities/path');
const adminData = require('./admin');
const router = express.Router();
//mini express app pluggable to another express app

router.get('/', (req, res)=> {
    const products = adminData.products;
    res.render('shop.ejs',
    {
        products: products,
        pageTitle: 'Main Page',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });

    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html')); // ../ go up one directory
    //res.send('hello from home route');
});

module.exports = router;

