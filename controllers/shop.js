//controller for all product-related logic
//const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');



exports.getProducts = (req, res)=> {
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

exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        console.log(product);
        res.render('shop/product-detail.ejs', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
    
}

exports.getIndex = (req, res)=> {
   console.log('log from index');
    Product.fetchAll()
    .then(products => {
      res.render('shop/index.ejs', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
   
};


exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
        req.user.addToCart(product);
    })
    .then(result => {
        console.log("Product saved");
        res.redirect('/cart');
    });

  
}


exports.getOrders = (req, res) => {
    res.render('shop/orders.ejs', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCart = (req, res) => {
    req.user.getCart()
    .then(products => {
        res.render('shop/cart.ejs', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
        });
    })
    .catch(error =>{
        console.log(error);
    });

};

exports.postCartDeleteProduct = (req, res) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(error => {
        console.log('Failed to delete an item.');
    });
}