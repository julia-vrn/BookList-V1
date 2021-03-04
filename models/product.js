
const mongodb = require('mongodb');
const getDb = require('../utilities/db').getDb; //mport db connection

class Product {
    constructor(title, imageUrl, price, description, id, userId){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save(){
        const db = getDb(); //connect to mongodb and save the product
        let dbOperation;
        if(this._id){
            console.log("hello from update");
            //update the product
            dbOperation = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOperation = db.collection('products').insertOne(this);
            
        }
        
        return dbOperation.then(result => {
            console.log("Product saved");
        })
        .catch(error=>{
            console.log(error);
        });
    }



    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray()
        .then(products => {
            
            return products;
        })
        .catch(error => {
            console.log(error);
            
        });

     
           
          
    }

    static findById(productId){
        const db = getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(productId)}).next()
        .then(product => {
            console.log(product);            
            return product;
        })
        .catch(error => {
            console.log(error);
            
        });
    }

    static deleteById(productId) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)})
        .then(result => {
            console.log("item deleted");
            
        })
        .catch(error => {
            console.log(error);
            
        });
    }
}

module.exports = Product;