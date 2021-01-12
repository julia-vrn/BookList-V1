//to handle the creation of the product
const path = require('path');
const express = require('express');
const rootDir = require('../utilities/path');
const router = express.Router();
const products = [];
//mini express app pluggable to another express app

/* router.get('/admin/add-product', (req, res) => {
    res.send('<form action="/add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>');
}); */

/*router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>');
});*/

/* router.post('/admin/add-product', (req, res)=> {
    res.redirect('/');
}); */

router.get('/add-product', (req, res, next) => {
    res.render('add-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
});

router.post('/add-product', (req, res)=> {
    products.push({title: req.body.title});
    res.redirect('/');
}); 

exports.router = router;
exports.products = products;