const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      isAuthenticated: req.session.isLoggedIn,
      editing: false
    });
}

exports.postAddProduct = (req, res)=> {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl,
        userId: req.user._id,
        isAuthenticated: req.session.isLoggedIn
    }); //mapping
   //save method is provided by mongoose
    product.save()
    .then(result => {
        console.log('Product added');
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log(error);
    })

    // console.log(req.user);
    // const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description, null, req.user._id);
    
    // product
    // .save()
    // .then(result => {
    //   // console.log(result);
    //   console.log('Created Product');
    //   res.redirect('/admin/products');
    // })
    // .catch(err => {
    //   console.log(err);
    // });
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
            product: product,
            isAuthenticated: req.session.isLoggedIn
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

    Product.findById(productId).then(product => {
        product.title = updatedTitle;
        product.description = updatedDescription;
        product.price = updatedPrice;
        product.imageUrl = updatedimageUrl;
        return product.save();
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(error => {
        console.log(error);
    });
}

exports.getProducts = (req, res) => {
    Product.find().then(products => {
        res.render('admin/products.ejs',
            {
                products: products,
                pageTitle: 'Adming Products',
                path: '/admin/products',
                isAuthenticated: req.session.isLoggedIn
            }); 
    });
    // Product.fetchAll()
    // .then(products => {
    //      res.render('admin/products.ejs',
    //     {
    //         products: products,
    //         pageTitle: 'Admin Products',
    //         path: '/admin/products'
    //     });
    // })
    // .catch(error => {
    //     console.log(error);
        
    // });
}


exports.postDeleteProduct = (req, res) => {
    const productId = req.body.productId;
    Product.findByIdAndDelete(productId)
    .then(() => {
        res.redirect('/admin/products');
    });
   
}