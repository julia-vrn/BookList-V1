//controller for all product-related logic
//const products = [];
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
}

exports.postAddProduct = (req, res)=> {
    const product = new Product(req.body.title, req.body.imageUrl,req.body.price, req.body.description);
    console.log(product);
    product.save();
    /*products.push({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.bodydescription
    });*/
    res.redirect('/');
}

exports.getProduct = (req, res)=> {
    console.log('log from index');
    Product.fetchAll(products => {
         res.render('shop/index.ejs',
        {
            products: products,
            pageTitle: 'Main Page',
            path: '/'
        });
    });

   
}