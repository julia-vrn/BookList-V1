//controller for all product-related logic
//const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');



exports.getProducts = (req, res)=> {
    console.log('log from index');
    Product.find().then(products => {
        res.render('shop/product-list.ejs',
            {
                products: products,
                pageTitle: 'All Products',
                path: '/products'
            }); 
    });
    // Product.fetchAll(products => {
    //      res.render('shop/product-list.ejs',
    //     {
    //         products: products,
    //         pageTitle: 'All Products',
    //         path: '/products'
    //     });
    // });   
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
    })
    // Product.findById(productId)
    // .then(product => {
    //     console.log(product);
    //     res.render('shop/product-detail.ejs', {
    //         product: product,
    //         pageTitle: product.title,
    //         path: '/products'
    //     });    
}

exports.getIndex = (req, res)=> {
    Product.find().then(products => {
        res.render('shop/index.ejs',
            {
                products: products,
                pageTitle: 'All Products',
                path: '/'
            }); 
    });
   
};


exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log("Product saved to cart");
        res.redirect('/cart');
    });

  
}


exports.getCart = (req, res) => {
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
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

exports.postOrder = (req, res) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return {qty: i.qty, product: {...i.productId._doc} };
        }); 
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products            
        });
        return order.save();
    })
    .then(result =>{
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders')
    })
    .catch(error => {
        console.log(error);
    });
 

}

exports.getOrders = (req, res) => {
    Order.find({"user.userId": req.user._id})
    .then(orders => {
        res.render('shop/orders.ejs', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(error => {
        console.log(error);
    });
}
