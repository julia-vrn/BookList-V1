//controller for all product-related logic
//const products = [];
const Product = require('../models/product');



exports.getProduct = (req, res)=> {
    console.log('log from index');
    Product.fetchAll(products => {
         res.render('shop/product-list.ejs',
        {
            products: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
   
}

exports.getIndex = (req, res)=> {
    console.log('log from index');
    Product.fetchAll(products => {
         res.render('shop/index.ejs',
        {
            products: products,
            pageTitle: 'Main Page',
            path: '/'
        });
    });
   
};

exports.getCart = (req, res) => {
    res.render('shop/cart.ejs', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.getOrders = (req, res) => {
    res.render('shop/orders.ejs', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkou', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};