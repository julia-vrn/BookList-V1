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
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    console.log(product);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
         res.render('admin/products.ejs',
        {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}