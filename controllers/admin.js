const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
}

exports.postAddProduct = (req, res)=> {
    console.log(req.user);
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description, null, req.user._id);
    
    product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: editMode, 
            product: product
          });
    })
    .catch(errpr => {
        console.log(errpr);
    });    
}


exports.postEditProduct = (req, res) => {
    //create new product instance and populate it
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedimageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    const updatedProduct = new Product(updatedTitle, updatedimageUrl, updatedPrice, updatedDescription, productId);
    console.log("PRODUCT ID" + productId);
    
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
    Product.fetchAll()
    .then(products => {
         res.render('admin/products.ejs',
        {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
    .catch(error => {
        console.log(error);
        
    });
}


exports.postDeleteProduct = (req, res) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
    .then(() => {
        res.redirect('/admin/products');
    });
   
}