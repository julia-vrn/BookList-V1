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
    Product.findById(productId, product => {
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
    Product.fetchAll(products => {
         res.render('shop/index.ejs',
        {
            products: products,
            pageTitle: 'Main Page',
            path: '/'
        });
    });
   
};


exports.postCart = (req, res) => {
    const productId = req.body.productId;
    console.log(productId);
    //get product
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });
    
    res.redirect('/cart');
}


exports.getOrders = (req, res) => {
    res.render('shop/orders.ejs', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCart = (req, res) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(cartProduct => cartProduct.id === product.id);
                if(cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart.ejs', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        })
    });
    
};

exports.postCartDeleteProduct = (req, res) => {
    const productId = req.body.productId;
    //get the price as well before we issue the delete request
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
}