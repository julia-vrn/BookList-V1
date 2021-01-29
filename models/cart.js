const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch from previous cart
      
        //add new product / increase quantity

        fs.readFile(filePath, (error, fileContent) => {
            let cart = {products: {}, totalPrie: 0};
            if(!error){
                cart = JSON.parse(fileContent);
            }
            //analyze the cart - find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = { ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products, updatedProduct];
                cart.products[existingProductIndex] = updatedProduct; //replace existing products
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + productPrice;

            
            fs.writeFile(filePath, JSON.stringify(cart), error => {
                console.log(error);
            });
        });
          

    }


}