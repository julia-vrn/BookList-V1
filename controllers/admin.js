const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
}

exports.postAddProduct = (req, res)=> {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    console.log(product);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findById(productId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: editMode, 
            product: product
          });
    });

    
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