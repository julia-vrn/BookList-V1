const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch from previous cart
      
        //add new product / increase quantity

        fs.readFile(filePath, (error, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!error){
                cart = JSON.parse(fileContent);
            } else {
                console.log("Error reading a file");
            }
            //analyze the cart - find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;//updaye quantity
                cart.products = [...cart.products];//copy the old array
                cart.products[existingProductIndex] = updatedProduct; //replace existing products
            } else {
                updatedProduct = {id: id, qty: 1};//it's enough to store the ids of the products
                cart.products = [...cart.products, updatedProduct];//just add a new product
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            
            fs.writeFile(filePath, JSON.stringify(cart), error => {
                console.log(error);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(filePath, (error, fileContent) => {
            if(error){
                return;
            } 

            const updatedCart = {...JSON.parse(fileContent)};
            console.log("updated cart " + updatedCart);
            const product = updatedCart.products.find(product => product.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(filePath, JSON.stringify(updatedCart), error => {
                console.log(error);
            });

        });
    }

    static getCart(cb) {
        //access the file and get the products ids
        fs.readFile(filePath, (error, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(error){
                cb(null)
            } else {
                cb(cart);
            }
        });
    }



}