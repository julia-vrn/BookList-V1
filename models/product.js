const getDb= require('../utilities/db').getDb; //mport db connection

class Product {
    constructor(title, price, description, imageurl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){
        //connect to mondogd and save the product
    }
}

module.exports = Product;